class BitcoinExchange < Sinatra::Base

  get "/contact_us" do
    haml :"pages/contact_us"
  end

end