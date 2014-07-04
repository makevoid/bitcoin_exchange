class WithdrawalFiat
  # store: sql
  
  attr_reader :id, :user_id, :amount, :type
  
  def initialize(id: id, user_id: user_id, amount: amount, state: state)
    @id       = id
    @user_id  = user_id
    @amount   = amount
    @state    = state    # :pending, :executed
  end
  
  def self.create(user_id: user_id, amount: amount)
    withdrawal = nil
    DB.session do |db|
      withdrawal = db[:withdrawals_fiat].new(user_id: user_id, amount: amount, id: new_id(db[:withdrawals_fiat]))
      db[:withdrawals_fiat].save withdrawal
      db.flush
    end
    withdrawal
  end
  
  def self.all
    DB[:withdrawals_fiat]
  end

  
  # state_machine
  # property :state, Enum[:pending, :executed]
  
  # fiat withdrawals need manual confirmation from admin in the first phase
  def confirm
    self.state = :executed
    save
  end
  
end
