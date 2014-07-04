class WithdrawalError < StandardError
  # out of funds
end


class WithdrawalBtc
  # store: sql
  
  attr_reader :id, :user_id, :amount, :type
  
  def initialize(id: id, user_id: user_id, amount: amount)
    @id       = id
    @user_id  = user_id
    @amount   = amount
  end
  
  def self.create(user_id: user_id, amount: amount)
    # withdrawal = new(user_id: user_id, amount: amount)
    # withdrawal.save
    withdrawal = nil
    DB.session do |db|
      withdrawal = db[:withdrawals_btc].new(user_id: user_id, amount: amount, id: new_id(db[:withdrawals_btc]))
      db[:withdrawals_btc].save withdrawal
      db.flush
    end
    withdrawal
  end
  
  def self.all
    DB[:withdrawals_btc]
  end

  #### old specific

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


# rom notes

# DB.session{ |session| w = session[:withdrawals].new(id: 1, user_id: 2); session[:withdrawals].save(w); session.flush }

# DB.session do |db|
#   w = db[:withdrawals].new(id: 2, user_id: 3)
#   db[:withdrawals].save w
#   db.flush
# end



# DB.session{ |session| session[:withdrawals].restrict(id: 1).one }

# DB.session{ |session| session[:withdrawals].restrict(id: 1).one }

# DB[:withdrawals].new(user_id: 1).save

