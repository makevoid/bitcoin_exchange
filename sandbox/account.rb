class Account

  # account must be in the sandbox but it's least prone to an attach than wallet

  def self.available_btc
    Wallet.balance - Order.balance_btc
  end




end