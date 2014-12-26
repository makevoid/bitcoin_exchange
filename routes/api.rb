
require_relative "../exts/bitstamp/bitstamp_book"


class BitcoinExchange < Sinatra::Base

  # for orderbook chart
  get "/api/orderbook" do
    content_type :json
    BitstampBook.orders.to_json
  end

  get "/api/transactions" do
    content_type :json
    BitstampTrades.transactions.to_json
  end

  # for price  chart
  # for volume chart

end