# fiat deposit
# it will be managed manually from the admin at the beginning
# scraping home banking website will be used to notify of new deposits


class Deposit
  # store: sql
  include DataMapper::Resource
  
  property :id,         Serial
  property :amount,     Float, required: true
  property :created_at, DateTime
  
  belongs_to :user
  
  before :create do
    self.created_at = Time.now
  end
end

class DepositBtc < Deposit
  # errors: address not created yet
  
end

class DepositFiat < Deposit
end
