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
  
  after :create do
    # TODO: implement btc type
    type = :eur
    key = "users:#{self.user_id}:balance_#{type}"
    value = R[key] || 0
    R[key] = value.to_f
    # incrby is faster but doesn't support float
    # R.incrby key, self.amount
  end
  
end

class DepositBtc < Deposit
  # errors: address not created yet
  
end

class DepositFiat < Deposit
end
