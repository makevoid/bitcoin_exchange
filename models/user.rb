class User

  attr_reader :id, :username, :btc_address
  # :phone, :

  def initialize(id: id, username: username, btc_address: btc_address)
    @id           = id
    @username     = username
    @btc_address  = btc_address
  end

  def orders_open
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