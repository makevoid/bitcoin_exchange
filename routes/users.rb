class BitcoinExchange < Sinatra::Base
  
  get "/user" do
    haml :user
  end
  
  post "/user/generate_address" do
    # generate a btc address
  end
  
  
end