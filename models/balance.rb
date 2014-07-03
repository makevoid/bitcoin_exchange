class Balance
  # store: redis

  attr_reader :btc, :eur, :btc_eur

  def initialize(user)
    @user = user
    @btc = Wallet.balance_user user.id # TODO: get value from redis?
    @eur = 50   # TODO: get value from redis
    @btc_eur = @btc * Ticker.last
  end
  
  # available = total owned - value in open orders
  
  def btc_available
    btc - Order.balance_btc
  end
  
  def eur_available
    0
  end
  
  def account_value
    0
  end

end