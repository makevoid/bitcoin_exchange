class WithdrawalFiat
  # store: sql
  
  attr_reader :id, :user_id, :amount, :type
  
  def initialize(id: id, user_id: user_idexecuted, amount: amount, executed: executed)
    @id       = id
    @user_id  = user_id
    @amount   = amount
    @executed    = executed    # :pending, :executed
  end
  
  def self.create(user_id: user_id, amount: amount, executed: executed)
    withdrawal = nil
    DB.session do |db|
      withdrawal = db[:withdrawals_fiat].new(user_id: user_id, amount: amount, id: new_id(db[:withdrawals_fiat]), executed: executed)
      db[:withdrawals_fiat].save withdrawal
      db.flush
    end
    withdrawal
  end
  
  def self.all
    DB[:withdrawals_fiat]
  end

  
  # executed_machine
  # property :executed, Enum[:pending, :executed]
  
  # fiat withdrawals need manual confirmation from admin in the first phase
  def confirm
    DB.session do |db|
      self.executed = true
      save
    end
  end
  
end
