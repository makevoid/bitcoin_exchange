class User

  include DataMapper::Resource
  
  property    :id,            Serial
  property    :username,      String
  property    :btc_address,   String # TODO: validate this
  

  def orders_open
    Order.open self.id
  end
  alias :orders :orders_open
  
  # transactions
  def orders_closed
    # TODO: implement!!!!
    []
  end

  def balance
    @balance ||= Balance.new self
  end
  

  # store: sql / json?
end