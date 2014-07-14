class BitcoinExchange < Sinatra::Base
  
  # TODO: remove this routes in production
  
  # deposits/eur/fake_add ?
  post "/deposits/fake_add" do
    DepositFiat.create amount: 500.0, user_id: current_user.id
    
    redirect "/deposits"
  end
  
end