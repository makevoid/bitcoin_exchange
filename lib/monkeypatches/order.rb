# FIXME: remove it in production or use only in views!!!

class Order
  include Blizz::Resource
end

def order_h(hash)
  order = Blizz.load Order, hash
  # order.time = order.time.to_i
  order
end