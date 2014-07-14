class Order
  # store: redis
  
  attr_reader :id, :user_id, :type, :amount, :price, :time
  
  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
    @id       = id.to_i
    @time     = time.to_i
    
    @user_id  = user_id.to_i
    # TODO: raise type not defined?
    @type     = type.to_sym
    @amount   = amount.to_f
    @price    = price.to_f
  end
  
  def self.simple_price_buy
    # TODO:
    # current price + 2%
    # 500 + 2%
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
    
    user = User.get user_id
    balance = user.balance

    # TODO: FIXME sanitize price parameter (can't place order < 0 or > 3000
    raise "PriceError" if price <= 0 || price > 3000
    # TODO: FIXME check if amount is available
    raise "AmountError" if amount > 10 || amount < 0.0001 # limit to 10 BTC
    raise "TypeError" unless [:buy, :sell].include?(type)
    raise "NotEnoughFundsEur - amount: #{amount}, balance: #{balance.eur_available}" if type == :buy && amount > balance.eur_available
    raise "NotEnoughFundsBtc - amount: #{amount}, balance: #{balance.btc_available}" if type == :sell && amount > balance.btc_available
    
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
    R.sadd "orders_#{type}", id
    
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

  def self.hash(order_id)
    R.hgetall "orders:#{order_id}"
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
  
  def self.type(type)
    order_ids = R.smembers "orders_#{type}"
    hashes order_ids
  end
  
  def self.user_type(user_id, type)
    order_ids = R.smembers "users:#{user_id}:orders_#{type}"
    hashes order_ids
  end
  
  def self.not_user_type(user_id, type)
    order_ids = R.sdiff "orders_#{type}", "users:#{user_id}:orders_#{type}"
    hashes order_ids
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
      amount.to_f
    end.inject(:+) || 0
  end
  
  def self.amount_sum_buy(user_id)
    order_ids = R.smembers "users:#{user_id}:orders_buy"
    orders = order_ids.map do |order_id|
      amount = R.hget "orders:#{order_id}", "amount"
      price  = R.hget "orders:#{order_id}", "price"
      { amount: amount.to_f, price: price.to_f }
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
    order_key = "orders:#{id}"
    user_id = R.hget "orders:#{id}", "user_id"
    type    = R.hget "orders:#{id}", "type"
    R.srem "users:#{user_id}:orders", id
    R.srem "users:#{user_id}:orders_#{type}", id
    R.srem "orders_#{type}", id
    R.del order_key
  end

  def resolved
    puts "resolved"
    order_closed_add
    Order.remove id
  end
  
  def order_closed_add
    order = Order.hash id

    puts R.keys "orders:*"
    puts order
    order.delete "id"
    order.merge! time_close: Time.now.to_i
    OrderClosed.create sym_keys order
  end
  
  def self.balance_btc(user)
    # balance (btc) in open orders
    amount_sum_sell user.id
  end

  def self.balance_eur(user)
    # balance in open orders, needs user
    amount_sum_buy user.id
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
