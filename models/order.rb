class Order
  # store: redis
  
  attr_reader :id, :user_id, :type, :amount, :price, :time
  
  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
    @id       = id
    @time     = time
    
    @user_id  = user_id
    @type     = type.to_sym
    @amount   = amount.to_f
    @price    = price.to_f
  end
  
  def self.create(user_id: user_id, type: type, amount: amount, price: price)
    # TODO: put the order in a queue?
    
    # TODO: maximum openable orders is 100, contact us to increae this value
    
    id = R.incr "ids:orders"
    type = type.to_sym
    # type = type == :bid ? :bid : :ask

    price = price.to_f
    amount = amount.to_f

    # TODO: FIXME sanitize price parameter (can't place order < 0 or > 3000
    raise "PriceError" if price <= 0 || price > 3000
    # TODO: FIXME check if amount is available
    raise "AmountError" if amount > 0.5 || amount < 0.0001
    raise "TypeError" unless [:buy, :sell].include?(type)
    
    # validate_attributes # ?

    # order_keys = %i(id user type amount price time) # sorted the right way
    R.hset "orders:#{id}", "id",      id
    R.hset "orders:#{id}", "user_id", user_id
    R.hset "orders:#{id}", "type",    type
    R.hset "orders:#{id}", "amount",  amount
    R.hset "orders:#{id}", "price",   price
    R.hset "orders:#{id}", "time",    Time.now.to_i
    
    # async { Orderbook.resolve self }
    
    true
  end

  def self.all
    orders = R.keys "orders:*"
    orders.map do |order|
      ord = R.hgetall order
      Order.new id: ord["id"], user_id: ord["user_id"], type: ord["type"], amount: ord["amount"], price: ord["price"], time: ord["time"]
    end
  end

  def self.cancel(id)
    order_key = "orders:#{id}"
    R.del order_key
    # TODO: copy in the logs
  end

  def self.balance_btc
    # balance in open orders, need user
    0
  end

  def self.balance_eur
    # balance in open orders, need user
    0
  end
  
  protected
  
  # def validate_attributes
  #   raise TypeError, "Order must be of type :buy or :sell" unless [:buy, :sell].include?(@type)
  #   raise TypeError, "Price must be positive" unless @price > 0
  #   raise TypeError, "Amount must be positive" unless @amount > 0
  # end

end
