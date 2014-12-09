require 'net/http'
require 'json'

class BitstampBook # Bitstamp OrderBook
  def self.orders
    new.orders
  end

  URL = "https://www.bitstamp.net/api/order_book/"

  def orders
    content = Net::HTTP.get_response URI.parse URL
    response = JSON.parse content.body
    bids = orders_to_hash response["bids"]
    asks = orders_to_hash response["asks"]
    time = Time.at response["timestamp"].to_i
    { bids: bids, asks: asks, time: time  }
  end

  private

  def orders_to_hash(orders)
    orders.map do |order|
      price   = order[0]
      amount  = order[1]
      { price: price, amount: amount }
    end
  end
end

# require 'pp'
# p BitstampBook.orders