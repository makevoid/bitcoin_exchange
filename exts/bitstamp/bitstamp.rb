# BitstampBook webapp
#
# Display Bitstamp api order book and latest trade prices

require 'sinatra'
require 'haml'

require_relative "../../lib/bitstamp_book"


get "/" do
  haml :index
end

get "/api/orderbook" do
  content_type :json
  BitstampBook.orders.to_json
end

get "/api/transactions" do
  content_type :json
  BitstampTrades.transactions.to_json
end
