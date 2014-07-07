class User

  include DataMapper::Resource
  
  property    :id,            Serial
  property    :username,      String
  property    :btc_address,   String # TODO: validate this
  

  def orders_open
    # TODO: move this code to Order class
    order_ids = R.smembers "user_orders:#{id}"
    order_ids.map do |order_id|
      ord = R.hgetall "orders:#{order_id}"
      Order.init ord
    end
  end
  
  # transactions
  def orders_closed

  end

  def balance
    @balance ||= Balance.new self
  end
  

  # store: sql / json?
end