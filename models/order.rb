class Order
  # store: redis
  
  attr_reader :id, :user_id, :type, :amount, :price, :time
  
  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
    @id       = id.to_i
    @time     = time.to_i
    
    @user_id  = user_id.to_i
    @type     = type.to_sym
    @amount   = amount.to_f
    @price    = price.to_f
  end
  
  def self.simple_price_buy
    # TODO:
    # current price + 2%
    # 450 + 2%
    459
  end
  
  def self.simple_price_sell
    # TODO: -2 %
    441
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
    
    price = price.to_f
    amount = amount.to_f
    
    fee = Orderbook::TX_FEE
    amount_total = amount + amount * fee
    
    user = User.get user_id
    balance = user.balance

    # TODO: FIXME sanitize price parameter (can't place order < 0 or > 3000
    raise "PriceError" if price <= 0 || price > 3000
    # TODO: FIXME check if amount is available
    raise "AmountError" if amount > 0.5 || amount < 0.0001
    raise "TypeError" unless [:buy, :sell].include?(type)
    raise "NotEnoughFundsEur - amount: #{amount_total}, balance: #{balance.eur_available}" if type == :buy && amount_total > balance.eur_available
    raise "NotEnoughFundsBtc - amount: #{amount_total}, balance: #{balance.btc_available}" if type == :sell && amount_total > balance.btc_available
    
    # validate_attributes # ?

    # order_keys = %i(id user type amount price time) # sorted the right way
    time = Time.now.to_i
    
    R.hset "orders:#{id}", "id",      id
    R.hset "orders:#{id}", "user_id", user_id
    R.hset "orders:#{id}", "type",    type
    R.hset "orders:#{id}", "amount",  amount
    R.hset "orders:#{id}", "price",   price
    R.hset "orders:#{id}", "time",    time
    
    R.sadd "users:#{user_id}:orders", id
    R.sadd "users:#{user_id}:orders_#{type}", id
    
    order = new(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
    
    # async { Orderbook.resolve self }
    Orderbook.resolve order
    
    order
  end

  def self.hashes(order_ids)
    order_ids.map do |order_id|
      ord = R.hgetall "orders:#{order_id}"
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
  
  def self.open(user_id)
    order_ids = R.smembers "users:#{user_id}:orders"
    hashes order_ids
  end
  
  def self.type(user_id, type)
    order_ids = R.smembers "users:#{user_id}:orders_#{type}"
    hashes order_ids
  end
  
  def self.type_amount_sum(user_id, type)
    order_ids = R.smembers "users:#{user_id}:orders_#{type}"
    order_ids.map do |order_id|
      R.hget "orders:#{order_id}", "amount"
    end.inject(:+) || 0
  end
  
  def self.init(ord)
    new id: ord["id"], user_id: ord["user_id"], type: ord["type"], amount: ord["amount"], price: ord["price"], time: ord["time"]
  end

  def self.cancel(id)
    order_key = "orders:#{id}"
    user_id = R.hget "orders:#{id}", "user_id"
    R.srem "users:#{user_id}:orders", id
    R.srem "users:#{user_id}:orders_#{type}", id
    R.del order_key
    # TODO: copy in the logs
  end

  def resolved
    # todo: mark as resolved
  end
  
  
  def self.balance_btc(user)
    # balance in open orders, need user
    type_amount_sum user, :btc
  end

  def self.balance_eur(user)
    # balance in open orders, need user
    type_amount_sum user, :eur
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
