class NotIncludedError < ArgumentError
end

module StringValidations
  def validate_in(array)
    raise NotIncludedError, "#{self.inspect} should be included in #{array.inspect}" unless array.find{ |str| self == str.to_sym  }
  end
end

class String
  include StringValidations
end

class Symbol
  include StringValidations
end


module FormHelpers

  def label(field, options)
    haml_tag(:label, for: field) do
      haml_concat options[:label] || field.to_s.capitalize
    end
  end

  def form_method(method)
    method.validate_in [:put, :delete]
    haml_tag :input, type: "hidden", name: "_method", value: method
  end

  def input(object, field, options={})
    label field, options
    name = object.class.name.downcase
    attributes = { type: "text", name: "#{name}[#{field}]", id: field, value: object.send(field) }
    options.delete :label
    options[:placeholder] = field if options[:placeholder] == true
    haml_tag :input, attributes.merge(options)
  end

  def textarea(object, field, options={})
    name = object.class.name.downcase
    attributes = { name: "#{name}[#{field}]", id: field }
    options.delete :label
    text = find_and_preserve do
      label field, options
      haml_tag(:textarea, attributes.merge(options) ) do
        haml_concat object.send(field)
      end
    end
    # text.gsub(/&#x000A;  /, '&#x000A;') # FIXME: wtf?
  end

  def validations_for(object)
    haml_tag :div, class: "validations" do
      errors = object.errors.map{ |e| e }.flatten
      errors.each do |message|
        haml_tag(:p) { haml_concat message }
      end
    end unless object.errors.empty?
  end

  # def submit(label)
  #   haml_tag :div, class: "submit" do
  #     haml_tag :input, type: "submit", value: label
  #   end
  # end

end