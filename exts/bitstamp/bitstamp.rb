# BitstampBook demo webapp
#
# Display Bitstamp api order book and latest trade prices

require 'sinatra'
require 'haml'


get "/" do
  haml :index
end

# this is the code you want to copy / integrate in your app

require_relative "bitstamp_book" #  remember to adjust the path, it will be probably "../exts/bitstamp/bitstamp_book"

include Caching

# for orderbook chart
get "/api/orderbook" do
  content_type :json
  cache :orderbook do
    BitstampBook.orders
  end.to_json
end

get "/api/transactions" do
  content_type :json
  cache :transactions do
    BitstampTrades.transactions
  end.to_json
end

# for price  chart
# for volume chart
