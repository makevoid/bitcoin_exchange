require 'sinatra'
require 'sinatra/content_for'

class BitcoinExchange < Sinatra::Base
  helpers Sinatra::ContentFor


  get "/contact_us" do
    haml :"pages/contact_us"
  end

  get "/home" do
    haml :"pages/home" , layout: :layout_home
  end

  get "/landing" do
    haml :"pages/landing", layout: :layout_landing

  end

end
