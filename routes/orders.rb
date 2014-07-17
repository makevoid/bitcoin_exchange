class BitcoinExchange < Sinatra::Base

  get "/orders" do
    # open, closed
    haml :"orders/index"
  end

  %w(/orders/new /orders_new).each do |route|
    get route do
      # place an order
      haml :"orders/new"
    end
  end

  post "/orders" do
    # place a buy / sell order
    order = params[:order] || {}
    attributes = { user_id: current_user.id, type: order[:type].to_sym, amount: order[:amount].to_d }
    if order[:simple]
      Order.create_simple attributes
    else
      Order.create attributes.merge( price: order[:price] )
    end
    redirect "/orders"
  end

  delete "/orders/:id" do |id|
    # cancel an order (don't delete it, mark it as canceled?)
    Order.cancel id.to_i
    redirect "/orders"
  end


end