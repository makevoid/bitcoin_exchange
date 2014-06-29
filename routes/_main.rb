class BitcoinExchange < Sinatra::Base
  get "/" do
    haml :index
  end
end