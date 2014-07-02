require_relative "order"

class ClosedOrder < Order
  # store: sql
  
  attr_reader :time_close

  def initialize(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    @time_close = time_close
    super
  end
  
  def self.create(user_id: user_id, type: type, amount: amount, price: price, time: time)
    order = new(user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    order.save
  end

  # TODO: change datastore to sql?

  def self.all
    orders = R.keys "closed_orders:*"
    orders.map do |order|
      ord = R.hgetall order
      ClosedOrder.new id: ord["id"], user_id: ord["user_id"], type: ord["type"], amount: ord["amount"], price: ord["price"], time: ord["time"]
    end
  end

  def save
    id = R.incr "ids:closed_orders"
    R.hset "closed_orders:#{id}", "id",       id
    R.hset "closed_orders:#{id}", "user_id",  user_id
    R.hset "closed_orders:#{id}", "type",     type
    R.hset "closed_orders:#{id}", "amount",   amount
    R.hset "closed_orders:#{id}", "price",    price
    R.hset "closed_orders:#{id}", "time",     time
    R.hset "closed_orders:#{id}", "time_close", time_close
    
    true
  end

end