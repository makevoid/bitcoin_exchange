class BitcoinExchange < Sinatra::Base
  
  # home page
  get "/" do
    haml :index
  end
  
end