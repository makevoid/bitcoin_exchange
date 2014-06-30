path = File.expand_path '../../', __FILE__
PATH = path
APP = "bitcoin_exchange"

require "bundler/setup"
Bundler.require :default

require "#{path}/lib/mixins/utils"
include Utils


require "#{path}/lib/monkeypatches/markedup"


def app_env
  ENV["RACK_ENV"] || "development"
end



require "#{path}/sandbox/account"

# wallet connections

require "#{path}/sandbox/wallet"
puts "WALLET:"
puts Wallet.getinfo
puts


# data store

R = Redis.new

# reset
# R.keys.map{ |key| R.del key }
# R.flushdb


# models and libs

require "#{path}/lib/ticker"
require_all "models"

# view code

TITLE = "BitcoinExchange"

