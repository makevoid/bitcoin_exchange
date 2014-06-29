class BitcoinExchange < Sinatra::Base

  get "/users/current" do
    haml :"users/current"
  end

  post "/users/generate_address" do
    # generate a btc address
  end


end