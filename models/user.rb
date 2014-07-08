class User

  include DataMapper::Resource
  
  property    :id,            Serial
  property    :username,      String
  property    :btc_address,   String # TODO: validate this
  

  def orders_open
    Orders.open self.id
  end
  
  # transactions
  def orders_closed

  end

  def balance
    @balance ||= Balance.new self
  end
  

  # store: sql / json?
end