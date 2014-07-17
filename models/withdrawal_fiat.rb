class WithdrawalFiat
  # store: sql
  include DataMapper::Resource

  property    :id,          Serial
  property    :amount,      Float, required: true
  property    :executed,    Boolean, default: false
  property    :created_at,  DateTime

  belongs_to  :user
  # property :user_id,  Integer


  before :create do
    self.created_at = Time.now
  end

  def status_label
    executed? ? "Executed" : "Waiting to be processed"
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
