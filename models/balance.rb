class Balance
  # store: redis

  # attr_reader :btc, :eur, :btc_eur
  attr_reader :user

  def initialize(user)
    @user    = user
  end
  
  # available = total owned - value in open orders
  
  def btc
    # Wallet.balance_user user.id # TODO: cache value in redis - users:id:balance_btc ?
    R["users:#{user.id}:balance_btc"].to_f || 0
    # TODO: build a checker that ensures the two values are the same
  end
  
  def eur
    R["users:#{user.id}:balance_eur"].to_f || 0
  end

  def btc_eur
    btc * Ticker.last
  end
  
  def total_value
    eur + btc_eur
  end
  
  ###
  
  def btc_available
    btc - Order.balance_btc(user)
  end
  
  def eur_available
    eur - Order.balance_eur(user)
  end
  
  def account_value
    eur + btc * Orderbook.price_last
  end

end