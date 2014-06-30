class Order
  # store: redis
  def self.create(user: user, type: type, amount: amount, price: price)
    id = R.incr "ids:orders"
    type = type == :buy ? :buy : :sell

    price = price.to_f
    amount = amount.to_f

    # TODO: FIXME sanitize price parameter (can't place order < 0 or > 3000
    raise "PriceError" if price <= 0 || price > 3000
    # TODO: FIXME check if amount is available
    raise "AmountError" if amount > 0.5 || amount < 0.0001

    # order_keys = %i(id user type amount price time) # sorted the right way
    R.hset "orders:#{id}", "id",     id
    R.hset "orders:#{id}", "user",   user.id
    R.hset "orders:#{id}", "type",   type
    R.hset "orders:#{id}", "amount", amount
    R.hset "orders:#{id}", "price",  price
    R.hset "orders:#{id}", "time",   Time.now.to_i
  end

  def self.all
    orders = R.keys "orders:*"
    orders.map do |order|
      R.hgetall order
    end
  end

  def self.cancel(id)
    R.del "orders:#{id}"
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