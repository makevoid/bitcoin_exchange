
require_relative "../exts/bitstamp/bitstamp_book"
# require_relative "../exts/bitstamp/bitstamp_trades"


class BitcoinExchange < Sinatra::Base

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

end
