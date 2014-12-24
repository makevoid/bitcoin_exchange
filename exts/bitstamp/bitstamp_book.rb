require 'net/http'
require 'json'

# BitcoinExchange::Api
#
# TODO: move in appropriate file
#
# unless defined?(BitcoinExchange)
#   class BitcoinExchange; end
# end

def ui?
  defined? Sinatra
end

unless ui?

  ->{ class BitcoinExchange; end }[]

  class BitcoinExchange::Api
    HOST = "lemontree.io"
    BASE_URL = "http://#{HOST}/api"

    def self.order_book
      {
        bids: [
          { price: 500_00, amount: 10_000_000 },
          { price: 500_00, amount: 10_000_000 },
        ],
        asks: [
          { price: 500_00, amount: 10_000_000 },
          { price: 500_00, amount: 10_000_000 },
        ],
        time: DateTime
      }
    end
  end

end

class BitstampBook # Bitstamp OrderBook
  URL = "https://www.bitstamp.net/api/order_book/"

  def self.orders
    new.orders
  end

  def orders
    content  = Net::HTTP.get_response URI.parse URL
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


class BitstampTrades
  URL = "http://www.bitstamp.net/api/transactions/"

  def self.transactions
    new.transactions
  end

  def transactions
    txs = []
    content  = Net::HTTP.get_response URI.parse URL
    response = JSON.parse content.body
    response.each do |transaction|
      tx = {}
      tx[:time]   = Time.at transaction["date"].to_i
      tx[:price]  = transaction["price"]
      tx[:amount] = transaction["amount"]
      txs << tx
    end
    txs
  end
end

# require 'pp'
# pp BitstampTrades.transactions


# Usage:
#
# require 'pp'
# pp BitstampBook.orders


# Extra - integration

class ExchangePresenter # or validator
  def self.load(hash)
    {
      buy_ledger:   hash.fetch(:bids),
      sell_ledger:  hash.fetch(:asks),
      time:         hash.fetch(:time)
    }
  end
end

# lemontree_orders  = BitcoinExchange::Api
# bitstamp_orders   = BitstampBook.orders

# puts lemontree_orders
# puts bitstamp_orders