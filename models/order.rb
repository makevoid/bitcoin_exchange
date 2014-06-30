class Order
  # store: redis
  def self.create(user: user, type: type, amount: amount, price: price)
    id = R.incr "orders:id"
    type = type == :buy ? :buy : :sell
    R.hset "orders:#{id}", "type",   type
    R.hset "orders:#{id}", "amount", type
    R.hset "orders:#{id}", "user",   user.id
  end



  def self.balance_btc
    # balance in open orders
    0
  end

  def self.balance_btc
    # balance in open orders
    0
  end


end