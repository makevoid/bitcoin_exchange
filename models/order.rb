class NullOrder
end

class Order
  # store: redis

  OrderAmountLimit  = 10    # BTC
  OrderNumLimit     = 1000  # an user can't open more than OrderNumLimit orders

  # notes:
  #
  # orders_[type] is the sorted set
  # orders|[type] is the set

  class PriceError < ArgumentError
  end
  class AmountError < ArgumentError
  end
  class TypeError < ArgumentError # not for the user
  end
  class NotEnoughFundsError < RuntimeError
  end
  class NotEnoughFundsEur < NotEnoughFundsError
  end
  class NotEnoughFundsBtc < NotEnoughFundsError
  end

  attr_reader :id, :user_id, :type, :amount, :price, :time, :resolved

  # TODO: consider in removing this, that is used only for orderbook in Order.type_sum atm
  attr_writer :amount

  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
    @id       = id.to_i
    @time     = time.to_i

    @user_id  = user_id.to_i
    # TODO: raise type not defined?
    @type     = type.to_sym
    @amount   = amount.to_d
    @price    = price.to_d

    @resolved = false
  end

  def price_eur
    (@price * @amount).to_f
  end

  def self.buy
    # TODO: implement
    # order_ids = R.smembers "users:#{user_id}:orders"
    order_ids  = R.zrange "orders_buy", 0, -1
    hashes order_ids
  end

  def self.sell
    order_ids  = R.zrange "orders_sell", 0, -1
    hashes order_ids
  end

  def self.simple_price_buy
    # TODO: implement the real way
    # 500 - 1%
    455
  end

  def self.simple_price_sell
    # TODO: +1 %
    465
  end

  def self.create_simple(user_id: user_id, type: type, amount: amount)
    price = if type == :buy
      simple_price_buy
    else
      simple_price_sell
    end

    create(user_id: user_id, type: type, amount: amount, price: price)
  end

  def self.create(user_id: user_id, type: type, amount: amount, price: price)

    # TODO: refactor!!! this is getting big!

    # TODO: put the order in a queue?

    # TODO: maximum openable orders is 100, contact us to increae this value

    id = R.incr "ids:orders"
    # TODO: consider: coerce here or only in routes?
    type = type.to_sym
    # type = type == :bid ? :bid : :ask

    price = price.to_d
    amount = amount.to_d

    user = User.get user_id
    balance = user.balance

    # TODO: FIXME sanitize price parameter (can't place order < 0 or > 3000
    raise PriceError if price <= 0 || price > 3000
    # TODO: FIXME check if amount is available
    raise AmountError if amount > OrderAmountLimit || amount < 0.0001
    raise TypeError unless [:buy, :sell].include?(type)
    raise NotEnoughFundsEur, "amount: #{amount}, balance: #{balance.eur_available}" if type == :buy && amount > balance.eur_available
    raise NotEnoughFundsBtc, "amount: #{amount}, balance: #{balance.btc_available}" if type == :sell && amount > balance.btc_available

    # validate_attributes # ?

    # order_keys = %i(id user type amount price time) # sorted the right way
    time = Time.now.to_i

    # puts "create order: #{id}, type: #{type},\t price: #{price.to_2s}, amount: #{amount.to_ds}"

    R.hmset "orders:#{id}", {
      id:       id,
      user_id:  user_id,
      type:     type,
      amount:   amount.to_ds,
      price:    price.to_2s,
      time:     time,
    }.to_a.flatten

    R.zadd "orders_#{type}", (price*100).to_i, id
    R.sadd "orders|#{type}", id # FIXME: probably we don't need a set equal to sorted set
    R.sadd "users:#{user_id}:orders", id
    R.sadd "users:#{user_id}:orders_#{type}", id

    order = new(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)

    # TODO: subtract from total balance

    # async { Orderbook.resolve self }
    Orderbook.resolve order

    order
  end

  def update_amount(sell_amount)
    @amount = amount - sell_amount
    R.hset "orders:#{id}", "amount",  @amount
  end


  def self.first(order_id)
    ord = hash order_id
    return NullOrder.new if ord == {}
    init ord
  end

  def self.hash(order_id)
    R.hgetall "orders:#{order_id}"
  end

  def self.hashes(order_ids)
    order_ids.map do |order_id|
      ord = hash order_id
      init ord
    end
  end

  def self.hashes_full(order_keys)
    order_keys.map do |order|
      ord = R.hgetall order
      init ord
    end
  end

  def self.all_admin
    # todo: naive, refactor, only admin
    orders = R.keys "orders:*"
    hashes_full orders
  end

  def self.open
    buy + sell
  end

  def self.user(user_id)
    # NOTE: slow implementation, use only in test env or slow page
    orders_id = R.smembers "users:#{user_id}:orders"
    orders = hashes orders_id
    orders.sort_by{ |a,b| [a.price] <=> [a.price] }
  end

  def self.type(type)
    order_ids = R.smembers "orders|#{type}"
    hashes order_ids
  end

  def self.type_sum(type)
    orders = type type

    summed = []
    orders.each do |order|
      unless order_found = summed.find{ |o| o.price == order.price  }
        summed << order
      else
        order_found.amount += order.amount
      end
    end
    summed
  end

  def self.type_limit(type, limit=20)
    # TODO: need sorted set
    order_ids = R.zmembers "orders_#{type}"
    hashes order_ids
  end

  # unused
  #
  # def self.user_type(user_id, type)
  #   order_ids = R.smembers "users:#{user_id}:orders_#{type}"
  #   hashes order_ids
  # end
  #
  # def self.not_user_type(user_id, type)
  #   order_ids = R.sdiff "orders|#{type}", "users:#{user_id}:orders_#{type}"
  #   hashes order_ids
  # end

  ORDER_MAX = 100_000_00

  # returns buy orders sorted in reverse (descending order)
  #
  def self.buy_ledger_match(price)
    order_ids = R.zrevrangebyscore "orders_buy", ORDER_MAX, price, limit: [0,1] #, limit: [0,10]
    first order_ids.first
  end

  # returns sell orders sorted
  #
  def self.sell_ledger_match(price)
    order_ids = R.zrangebyscore "orders_sell",  0, price, limit: [0,1] #, limit: [0,10]
    first order_ids.first
  end

  # type: buy / sell
  # currency: eur / btc
  # type: buy  > [eur]
  # type: sell > [btc]

  # returns btc value of all open sell orders
  def self.amount_sum_sell(user_id)
    order_ids = R.smembers "users:#{user_id}:orders_sell"
    order_ids.map do |order_id|
      amount = R.hget "orders:#{order_id}", "amount"
      amount.to_d
    end.inject(:+) || 0
  end

  def self.amount_sum_buy(user_id)
    order_ids = R.smembers "users:#{user_id}:orders_buy"
    orders = order_ids.map do |order_id|
      # TODO: use hmget
      amount = R.hget "orders:#{order_id}", "amount"
      price  = R.hget "orders:#{order_id}", "price"
      { amount: amount.to_d, price: price.to_d }
    end
    return 0 if order_ids.empty?
    orders.map do |order|
      order[:amount] * order[:price]
    end.inject(:+)
  end


  def self.init(ord)
    new sym_keys ord
  end

  def self.cancel(id)
    # TODO: log order cancellation by the user
    remove id
  end

  def self.remove(id)
    # TODO: use hmget
    user_id = R.hget "orders:#{id}", "user_id"
    type    = R.hget "orders:#{id}", "type"

    # puts "removing: #{id} #{type}"
    R.zrem "orders_#{type}", id
    R.srem "orders|#{type}", id
    R.srem "users:#{user_id}:orders", id
    R.srem "users:#{user_id}:orders_#{type}", id
    R.del "orders:#{id}"
  end

  def resolve!
    # puts "resolved: #{self.id}"
    # puts "orders: #{(R.keys "orders:*").inspect}"
    type = R.hget "orders:#{id}", "type"
    raise "CannotResolveDeletedOrder" unless type
    Order.remove id
    @resolved = true
  end

  def order_closed_add
    order_hash = Order.hash id
    order_hash.delete "id"
    order_hash.merge! time_close: Time.now.to_i
    # log "OrderClosed.create #{order_hash}"
    OrderClosed.create sym_keys order_hash
  end

  def self.balance_btc(user)
    # balance (btc) in open orders
    amount_sum_sell user.id
  end

  def self.balance_eur(user)
    # balance in open orders, needs user
    amount_sum_buy user.id
  end

  def resolved?
    resolved
  end


  protected

  # def validate_attributes
  #   raise TypeError, "Order must be of type :buy or :sell" unless [:buy, :sell].include?(@type)
  #   raise TypeError, "Price must be positive" unless @price > 0
  #   raise TypeError, "Amount must be positive" unless @amount > 0
  # end

  def balance_eur
    user.balance.eur_available
  end

  def balance_btc
    user.balance.btc_available
  end

end
