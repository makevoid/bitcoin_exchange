module ViewHelpers
  def body_class
    request.path.split("/")[1] || ""
  end

  def submit(label)
    haml_tag :button, type: "submit" do
      haml_concat label
    end
  end
  
  def hidden(name, value)
    haml_tag :input, name: name, value: value, type: "hidden"
  end

  def nav_link(url, label)
    css_class = "col2 desktop"
    css_class = "active col2 desktop" if body_class == url[1..-1]
    haml_tag :a, href: url, class: css_class do
      haml_concat label
    end
  end

  def js_void
    "javascript:void(0)"
  end
end