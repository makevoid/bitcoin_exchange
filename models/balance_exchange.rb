class BalanceExchange
  
  def instance
    @@balance ||= new
  end

  def eur
    R["exchange:eur"].to_f || 0
  end
  
  def btc
    R["exchange:btc"].to_f || 0
  end
  
  def btc_addresses
    # ....
    []
  end

end