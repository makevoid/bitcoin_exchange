# this class manages the orderbook
#
# it should be implemented in an evented fashion, consider using celluloid or eventmachine

class Orderbook
  # manages orders (Order)
  
  # TX_FEE = 0.015 #  1.5 %
  TX_FEE = 0.01    #  1   %
  
  
  def self.price_last
    450
  end
  
  def self.price_bid
    450
  end
  
  def self.price_ask
    450
  end
  
  # called every time after a new order is inserted
  def self.resolve(order)
    # TODO: make operation synchronous, add a lock in redis
    # for full asynchronicity consider an implementation using reactor pattern (Celluloid)
    
    # reads orders queue
    # if an order matches another, resolve it
    
    # TODO: consider the volume
    
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
      # use transactional style or lock (with a lock there is no need to use transactions)
      # log operation
      
      break if orders == []
    end
    
  end
  
  # TODO: naive approach, use everytime partial resolve
  def self.resolve_full(order1, order2)
    # puts "log: full resolve"
    
    # update balance1
    # update balance2
    # update exchange balance
    
    order1.resolved
    order2.resolved
  end
  
  def self.volume_not_enough
    false
  end
  
  def self.resolve_partial(order1, order2)
    # puts "log: partial resolve"
    # re-create new order with less volume
    true
  end
  
  ####
  
  # TODO: move in order.rb ?
  
  def self.matching_orders(order)
    type = order.type == :buy ? :sell : :buy
    orders = Order.not_user_type order.user_id, type
    # order.type == :buy ? orders : orders.reverse 
  end
  
end