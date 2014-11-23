class BitcoinExchange < Sinatra::Base

  get "/orders" do
    login_required
    # open, closed
    haml :"orders/index"
  end

  %w(/orders/new /orders_new).each do |route|
    get route do
      login_required
      # place an order
      haml :"orders/new"
    end
  end

  post "/orders" do
    active_user_required
    # place a buy / sell order
    order = params[:order] || {}
    attributes = { user_id: current_user.id, type: order[:type].to_sym, amount: order[:amount].to_d }

    order_create order, attributes

    redirect "/orders"
  end

  delete "/orders/:id" do |id|
    active_user_required
    # cancel an order (don't delete it, mark it as canceled?)
    raise "Can't delete another user's order" unless current_user.orders_include id.to_i
    Order.cancel id.to_i
    redirect "/orders"
  end

  private

  def order_create(order, attributes)
    begin
      if order[:simple]
        Order.create_simple attributes
      else
        order_create_limit order, attributes
      end
    rescue Order::NotEnoughFundsError => err
      flash_error_amount order, err
      halt haml :"orders/new"
    rescue Order::AmountError
      flash[:notice] = "The price you set is out of bounds. Limit is set to #{Order::OrderAmountLimit} BTC per order."
      halt haml :"orders/new"
    end
  end

  def order_create_limit(order, attributes)
    begin
      Order.create attributes.merge( price: order[:price] )
    rescue Order::PriceError
      flash[:notice] = "The price you set is out of bounds."
      halt haml :"orders/new"
    end
  end

  def flash_error_amount(order, error)
    balance = current_user.balance
    amount = error.class == Order::NotEnoughFundsBtc ? "€#{balance.eur_available.f_eur}" : "#{balance.btc_available.to_dz} BTC"
    flash[:notice] = "You need more funds to open that order. You have only #{amount} available. Check your account balance for details."
  end

end
