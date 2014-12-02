class BitcoinExchange < Sinatra::Base

  get "/market" do
    login_required
    haml :"market/index"
  end

end