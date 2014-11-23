class User
  # basic definition in ext/auth/models/user.rb
  include DataMapper::Resource

  property :id,         Serial
  property :btc_address,  String # TODO: validate this


  def orders_open
    Order.user self.id
  end
  alias :orders :orders_open

  # transactions
  def orders_closed
    # TODO: speedup!
    orders = OrderClosed.all
    orders.select{ |o| o.user_id ==  self.id }
  end

  def balance
    @balance ||= Balance.new self
  end


end
