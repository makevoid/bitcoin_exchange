class BitcoinExchange < Sinatra::Base
  
  get "/orders" do
    # open, closed
    
  end
  
  post "/order" do
    # create a buy / sell order
  end
  
  destroy "/order" do
    # cancel an order (don't delete it, mark it as canceled?)
  end
  
  
end