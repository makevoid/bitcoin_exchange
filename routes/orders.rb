class BitcoinExchange < Sinatra::Base

  get "/orders" do
    # open, closed
    haml :"orders/index"
  end
  
  get "/orders/new" do
    # place an order
    haml :"orders/new"
  end
  

  post "/orders" do
    # place a buy / sell order
    order = params[:order] || {}
    Order.create user: @current_user, type: order[:type], amount: order[:amount], price: order[:price]
    redirect "/orders"
  end

  delete "/orders/:id" do |id|
    # cancel an order (don't delete it, mark it as canceled?)
  end


end