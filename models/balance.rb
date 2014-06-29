class Balance
  # store: redis

  attr_reader :btc, :eur, :btc_eur

  def initialize
    @btc = 0.1  # TODO: get value from redis
    @eur = 50   # TODO: get value from redis
    @btc_eur = @btc * Ticker.last
  end

  # singleton methods (simple singleton implementation)

  @@balance = Balance.new

  # TODO: proxy methods

  def self.btc
    @@balance.btc
  end

  def self.eur
    @@balance.eur
  end

  def self.btc_eur
    @@balance.btc_eur
  end

end