require_relative "order"

class OrderClosed < Order
  # store: sql
  
  attr_reader :time_close

  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    @time_close = time_close
    super(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
  end
  
  def self.create(user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    order = new(user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    order.save
  end

  # TODO: change datastore to sql?

  def self.all
    orders = R.keys "orders_closed:*"
    orders.map do |order|
      ord = R.hgetall order
      OrderClosed.new sym_keys ord
    end
  end

  def save
    id = R.incr "ids:orders_closed"
    R.hset "orders_closed:#{id}", "id",       id
    R.hset "orders_closed:#{id}", "user_id",  user_id
    R.hset "orders_closed:#{id}", "type",     type
    R.hset "orders_closed:#{id}", "amount",   amount
    R.hset "orders_closed:#{id}", "price",    price
    R.hset "orders_closed:#{id}", "time",     time
    R.hset "orders_closed:#{id}", "time_close", time_close
    
    true
  end

end