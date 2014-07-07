class BitcoinExchange < Sinatra::Base
  
  # TODO: remove this routes in production
  
  post "/deposits/fake_add" do
    Deposit.create amount: 500.0, user_id: current_user.id
    
    redirect "/deposits"
  end
  
end