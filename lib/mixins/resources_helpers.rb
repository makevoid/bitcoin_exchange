module ResourcesHelpers
  def order_partial(order)
    haml_tag :span do
      haml_concat "#{order.type.upcase} #{order.amount} BTC"
    end
    haml_concat "@ €#{order.price.f_eur}"
  end
  
  def order_closed_partial(order)
    haml_tag :span do
      haml_concat "#{order.type.upcase} €#{order.price.f_eur}"
    end
    haml_concat "[#{order.amount} BTC] @ #{time_f order.time}"
  end
end