
require_relative "../exts/bitstamp/bitstamp_book"
# require_relative "../exts/bitstamp/bitstamp_trades"


class BitcoinExchange < Sinatra::Base

  # for orderbook chart
  get "/api/orderbook" do
    content_type :json
    cache :orderbook do
      BitstampBook.orders.to_json
    end
  end

  get "/api/transactions" do
    content_type :json
    cache :transactions do
      BitstampTrades.transactions.to_json
    end
  end

  # for price  chart
  # for volume chart

end