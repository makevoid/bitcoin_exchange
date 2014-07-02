class WithdrawalError < StandardError
  # out of funds
end


class Withdrawal
  # store: sql
  
  # property :id, Serial
  # property :amount, 
  # property :type, Enum[:btc, :eur]
  
  # property :user_id, Integer
  # belongs_to :user
  
  def initialize(user_id: user_id, amount: amount)
    @user_id = user_id
    @amount  = amount
  end
  
  def self.create(user_id: user_id, amount: amount)
    withdrawal = new(user_id: user_id, amount: amount)
    withdrawal.save
  end
end

class BtcWithdrawal < Withdrawal
  def initialize
    @type = :btc
    super
  end
  
  def execute
    check_withdrawal_number
    
    wallet_withdrawal
  end
  
  protected
  
  def wallet_withdrawal
    test_address = "1EiNgZmQsFN4rJLZJWt93quMEz3X82FJd2" # mkvd
    test_address = "1H6mVmUJnG1b2J8iFkN7bqfEV2y1phQ6hc" # test dev 2
    
    begin
      transaction = Wallet.send test_address, @amount
      # transaction = "6fb4a472c647f47078e190070d706631618d76a62aad5a47d2c8423ac574131d"
    rescue BitcoinClient::Errors::RPCError => e
      messages = {'{"code"=>-4, "message"=>"Insufficient funds"}' => "Insufficent funds"}
      raise WithdrawalError, "Withdrawal error: #{messages[e.message]}"
    else
      transaction
    end
  end
  
  def check_withdrawal_number
    # TODO: 
    # return "You have requested too many withdrawals, please wait until your previous withdrawals requests are confirmed from the bitcoin network" 
  end
end

class FiatWithdrawal < Withdrawal
  
  # state_machine
  # property :state, Enum[:pending, :executed]
  
  # fiat withdrawals need manual confirmation from admin in the first phase
  def confirm
    self.state = :executed
    save
  end
  
end

