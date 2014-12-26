class BitcoinExchange < Sinatra::Base

  get "/market" do
    haml :"market/index"
  end

end