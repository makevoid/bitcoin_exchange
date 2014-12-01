# this class manages the orderbook
#
# it should be implemented in an evented fashion, consider using celluloid or eventmachine

class Orderbook
  # manages orders (Order)

  TX_FEE_ENV = {
    development:  0.01.to_d, #  1 %
    test:         0.01.to_d, # leave it at 1% otherwise tests will not pass
    production:   0.015.to_d #  1.5 %
  }
  TX_FEE = TX_FEE_ENV[app_env]


  def self.price_last
    # TODO: use last price
    500.0.to_d
  end

  def self.price_bid
    # TODO: use last bid
    500.0.to_d
  end

  def self.price_ask
    # TODO: use last ask
    500.0.to_d
  end


  def self.resolve(order)
    matching = matching_order order
    order_out = resolve_one order, matching unless matching.is_a? NullOrder
    resolve order_out if order_out
  end

  # called every time after a new order is inserted
  def self.resolve_old(order)
    # TODO: make operation synchronous, add a lock in redis
    # for full asynchronicity consider an implementation using reactor pattern (Celluloid)

    order = matching_order order

    while orders
      order_sel = orders.pop
      break unless order_sel

      resolved = resolve_one order, order_sel

      # TODO: important
      # use transactional style or lock (with a lock there is no need to use transactions)
      # log operation

      break if orders == [] || resolved
    end

  end

  # TODO: naive approach, needs partial resolve into it, see next method's comment
  def self.resolve_one(order1, order2)
    # puts "log: full resolve"
    if order1.type == :buy
      order_buy, order_sell = order1, order2
    else
      order_buy, order_sell = order2, order1
    end

    fee = Orderbook::TX_FEE

    amount_max = if order_buy.amount < order_sell.amount
      order_buy.amount
    else
      order_sell.amount
    end

    # update buy
    user_id     = order_buy.user_id
    buy_eur     = amount_max  * order_buy.price
    buy_fee_eur = buy_eur     * fee
    buy_fee_btc = amount_max  * fee
    buy_btc     = amount_max  - buy_fee_btc
    bal_key     = "users:#{user_id}:balance_eur"
    buyer_balance_eur = (R[bal_key] || 0).to_d
    R[bal_key]  = (buyer_balance_eur - buy_eur).to_ds
    bal_key     = "users:#{user_id}:balance_btc"
    buyer_balance_btc = (R[bal_key] || 0).to_d
    R[bal_key]  = (buyer_balance_btc + buy_btc).to_ds

    # update sell
    user_id       = order_sell.user_id
    sell_btc      = amount_max
    sell_fee_btc  = sell_btc    * fee
    sell_eur      = amount_max  * order_sell.price
    sell_fee_eur  = sell_eur    * fee
    sell_eur_wfee = sell_eur    - sell_fee_eur
    bal_key       = "users:#{user_id}:balance_btc"
    seller_balance_btc = (R[bal_key] || 0).to_d
    R[bal_key]    = (seller_balance_btc - sell_btc).to_ds
    bal_key       = "users:#{user_id}:balance_eur"
    seller_balance_eur = (R[bal_key] || 0).to_d
    R[bal_key]    = (seller_balance_eur + sell_eur_wfee).to_ds

    # update exchange balance
    exch_eur = (R["exchange:eur"] || 0).to_d
    exch_btc = (R["exchange:btc"] || 0).to_d
    R["exchange:eur"] = (exch_eur + buy_fee_eur).to_ds
    R["exchange:btc"] = (exch_btc + sell_fee_btc).to_ds

    # TODO: refactor ?
    order_buy.update_amount  amount_max
    order_buy.order_closed_add(amount) # TODO: PASS AMOUNT
    order_sell.update_amount amount_max
    order_buy.order_closed_add(amount) # TODO: PASS AMOUNT

    order1.resolve! if order1.amount == 0
    order2.resolve! if order2.amount == 0

    order1 unless order1.resolved?
  end

  ####

  # TODO: move in order.rb ?

  def self.matching_order(order)
    type = order.type == :buy ? :sell : :buy
    price = order.price * 100

    # note: these methods have to return properly sorted results
    if type == :buy
      Order.buy_ledger_match  price
    else # sell
      Order.sell_ledger_match price
    end
  end


  def nah
    if order_buy.amount == order_sell.amount
      # puts "order equals - resolving both"
      order_buy.resolve!
      order_sell.resolve!
    else
      if order_buy.amount > order_sell.amount
        # puts "buy is higher - resolving sell"
        order_sell.resolve!
        order_buy.update_amount order_sell.amount
      else
        # puts "sell is higher - resolving buy"
        order_buy.resolve!
        order_sell.update_amount order_buy.amount
      end
    end

    order1.resolved?
  end

end


