class DepositBtc
  # store: sql
  
  # or use bitcoind and call it directly?
  
  include DataMapper::Resource
  
  property :id,         Serial
  property :amount,     Float, required: true
  property :created_at, DateTime
  
  belongs_to :user
  
  before :create do
    self.created_at = Time.now
  end
  
  after :create do
    type = :btc
    key = "users:#{self.user_id}:balance_#{type}"
    value = R[key] || 0
    R[key] = value.to_f + self.amount
    # incrby is faster but doesn't support float
    # R.incrby key, self.amount
  end
  
end




# errors: address not created yet