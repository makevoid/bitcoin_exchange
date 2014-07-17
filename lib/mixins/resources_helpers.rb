module ResourcesHelpers
  def book_order_partial(order)
    haml_tag :div, class: "row" do
      haml_tag :span do
        haml_concat "#{order.amount.to_dz} BTC"
      end
      haml_concat "@ €#{order.price.f_eur}"
    end
  end

  def order_partial(order)
    haml_tag :div, class: "row" do
      haml_tag :span do
        haml_concat "#{order.type.upcase} #{order.amount.to_dz} BTC"
      end
      haml_concat "@ €#{order.price.f_eur}"
    end
  end

  def order_closed_partial(order)
    haml_tag :div, class: "row" do
      haml_tag :span do
        haml_concat "#{order.type.upcase} €#{order.price.f_eur}"
      end
      haml_concat "[#{order.amount.to_dz} BTC] @ #{time_f order.time}"
    end
  end
end