class BitcoinExchange < Sinatra::Base
  get "/logout" do
    redirect "/"
  end
end