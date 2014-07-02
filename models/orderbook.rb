# this class manages the orderbook
#
# it should be implemented in an evented fashion, consider using celluloid or eventmachine

class Orderbook
  # manages Orders, Order
  
  def orders
    
  end 
  
  def resolve(order)
    # called every time an order gets in
    # reads orders queue
    # if an order matches another, resolve it
    
    # consider the volume
    
    orders = Order.matching_orders order
    
    # pseudo code
    while orders
      order = orders.pop
      
      # resolve order
      # create transaction
      
      break if orders == []
    end
    
  end
  
  ####
  
  # TODO: move in order.rb
  
  def self.matching_orders(order)
    type = order.type == :buy ? :sell : :buy
    # pseudo code:
    all
      # type: type
      # user_id: !order.user_id
      #price_sorting: order.type == :buy ? "ASC", "DESC"
      
  end
  
end