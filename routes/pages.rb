class BitcoinExchange < Sinatra::Base

  get "/contact_us" do
    haml :"pages/contact_us"
  end

  get "/home" do
    haml :"pages/home"
  end

end