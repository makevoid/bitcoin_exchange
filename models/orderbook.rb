# this class manages the orderbook
#
# it should be implemented in an evented fashion, consider using celluloid or eventmachine

class Orderbook
  # manages Orders, Order
  
  TX_FEE = 0.15 # %
  
  def orders
    
  end 
  
  def self.resolve(order)
    # called every time an order gets in
    # reads orders queue
    # if an order matches another, resolve it
    
    # consider the volume
    
    orders = matching_orders order
    
    # pseudo code
    while orders
      order_sel = orders.pop
      break unless order_sel
      
      if volume_not_enough
        resolve_partial(order, order_sel)
      else
        resolve_full(order, order_sel)
      end
      
      # TODO: important
      # use transactional style
      # log operation
      
      break if orders == []
    end
    
  end
  
  # TODO: naive approach, use everytime partial resolve
  def self.resolve_full(order1, order2)
    
    order1.resolved
    order2.resolved
  end
  
  def self.volume_not_enough
    false
  end
  
  def self.resolve_partial(order1, order2)
    # re-create new order with less volume
    true
  end
  
  ####
  
  # TODO: move in order.rb ?
  
  def self.matching_orders(order)
    type = order.type == :buy ? :sell : :buy
    user_id = order.user_id
    orders = Order.all.select{ |o| o.user_id != user_id && o.type == type }
    order.type == :buy ? orders : orders.reverse 
  end
  
end