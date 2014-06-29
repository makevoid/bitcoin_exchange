module Haml::Filters::Markedup

  include Haml::Filters::Base

  def render text
    markedup text
  end

private

  def markedup(text)
    "<p>" +
    text.split("\n").join("</p>\n<p>") +
    "</p>"
  end

end
