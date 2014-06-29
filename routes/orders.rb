class BitcoinExchange < Sinatra::Base

  get "/orders" do
    # open, closed
    haml :"orders/index"
  end
  
  get "/orders/new" do
    # place an order
    haml :"orders/new"
  end
  

  post "/order" do
    # place a buy / sell order
  end

  delete "/order" do
    # cancel an order (don't delete it, mark it as canceled?)
  end


end