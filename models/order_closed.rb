require_relative "order"

class OrderClosed < Order
  # store: sql... right?

  attr_reader :time_close

  def initialize(id:, user_id:, type:, amount:, price:, time:, time_close:)
    @time_close = time_close
    super(id: id, user_id: user_id, type: type, amount: amount, price: price, time: time)
  end

  def self.create(user_id:, type:, amount:, price:, time:, time_close:)
    order = new(user_id: user_id, type: type, amount: amount, price: price, time: time, time_close: time_close)
    order.save
  end

  # TODO: change datastore to sql and use async?

  def self.all
    orders = R.keys "orders_closed:*"
    orders.map do |order|
      ord = R.hgetall order
      OrderClosed.new sym_keys ord
    end
  end

  def save
    id = R.incr "ids:orders_closed"

    R.hmset "orders_closed:#{id}", {
      id:       id,
      user_id:  user_id,
      type:     type,
      amount:   amount.to_ds, # TODO: recheck if formatting is needed again for amount and price
      price:    price.to_2s,
      time:     time,
      time_close: time_close,
    }.to_a.flatten

    true
  end

end
