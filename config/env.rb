path = File.expand_path '../../', __FILE__
PATH = path
APP = "bitcoin_exchange"

require "bundler/setup"
Bundler.require :default

# patch redis for compat with v3
class Redis
  alias :"[]"  :get
  alias :"[]=" :set
end


require "#{path}/lib/mixins/utils"
extend Utils


require "#{path}/lib/monkeypatches/markedup"



def app_env
  (ENV["RACK_ENV"] && ENV["RACK_ENV"].to_sym) || :development
end

APP_ENV = app_env

class App
  def self.env
    APP_ENV
  end
end


# balance

# TODO: remember that other than wallet, even Balance (user balance, models/balance) have to be safeguarded


# wallet connections

def slice(hash, *keys)
  hash_new = {}
  hash.each do |key, val|
    hash_new[key] = val if keys.include?(key)
  end
  hash_new
end

# require 'pp'
require "#{path}/sandbox/wallet"


def initialize_wallet
  puts "Wallet:"
  puts slice( Wallet.getinfo, "balance", "version", "blocks", "connection", "testnet", "difficulty" ).to_yaml
  puts
end

def open_wallet
  begin
    initialize_wallet
  rescue Errno::ECONNREFUSED => e
    puts "ERROR launching the app"
    puts
    puts "Please open Bitcoin-QT or a compatible bitcoind/bitcoin-core client listening on port 8332

  you can use this sample ~/.bitcoin/bitcoin.conf and change auth parameters:

  rpcuser=changeme
  rpcpassword=CHANGE_ME1111
  rpcport=8332
  server=1
  "
    raise e

    # TODO: TEMPORARELY AVOIDING EXIT, SETUP BITCOIND PROPERLY AND RE-ENABLE this line!!!!
    # exit
  end
  puts
end

unless ENV["RACK_ENV"] == "test"
  open_wallet
end

# data store [redis]

options = {}
options[:driver] = :hiredis
options[:db] = 1
options[:db] = 2 if app_env == :test

R = Redis.new options

# reset
# R.keys.map{ |key| R.del key }
# R.flushdb

# data store [datamapper] mysql

password = File.read( File.expand_path "~/.password" ).strip if app_env == :production

test_db = "_test" if app_env == :test
password = "antanisblinda"
user_pass = "root:#{password}@"
DataMapper.setup :default, "mysql://#{user_pass}localhost/bitcoin_exchange#{test_db}"

require 'bigdecimal'
require "#{path}/lib/monkeypatches/numeric"
require "#{path}/lib/monkeypatches/dates"
require "#{path}/lib/monkeypatches/hash"
require "#{path}/lib/monkeypatches/string"

# extension (self-contained models, routes and view - live in ext folder)
require "#{path}/lib/sinatra_exts"


# loggers

require 'logger'
LOGGERS = {}
LOGGERS[:orders] = Logger.new STDOUT


# models and libs

require "#{path}/lib/ticker"
require "#{path}/lib/bitstamp_book"
require_all "models"

# bitstamp extension
require "#{path}/exts/bitstamp/bitstamp_book"


LOAD_DATAMAPPER_MODELS.call

DataMapper.finalize


# bitstamp (optional?)

# secrets = File.read( File.expand_path "~/.bitstamp" ).strip
# bs_user, bs_key, bs_secret = secrets.split "|"
#
# Bitstamp.setup do |config|
#   config.client_id  = bs_user
#   config.key        = bs_key
#   config.secret     = bs_secret
# end


# view code

TITLE = "BitcoinExchange"

SESSION_SECRET = "CHANGE_ME_IN_PRODUCTION_SECRET"

EMAIL_SUPPORT = "soon_support@example.com"

### users (sinatra ext)
