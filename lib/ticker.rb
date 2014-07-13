class Ticker
  # store: redis

  def initialize
    # retrieve value from redis: R.get("ticker.last") (from list)
    @last = 500.0
  end

  def last
    @last
  end

  def bid
    # last bid
  end

  def ask
    # last ask
  end

  ###

  # acts as a singleton

  @@ticker = Ticker.new

  def self.last
    @@ticker.last
  end

  def self.update
    @@ticker = Ticker.new
  end

end
