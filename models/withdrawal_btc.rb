class WithdrawalError < StandardError
  # out of funds
end


class WithdrawalBtc
  # store: sql
  include DataMapper::Resource
  
  property    :id,        Serial
  property    :amount,    Float
  property    :created_at,  DateTime
  
  belongs_to  :user
  # property :user_id,  Integer1

  
  before :create do
    self.created_at = Time.now
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

