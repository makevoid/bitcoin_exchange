path = File.expand_path '../', __FILE__

require "#{path}/bitcoin_exchange"
# require "#{path}/admin/admin_panel"
# require "#{path}/api/api"
# use Admin
# use Api
ENV['RACK_ENV'] ||= 'development'

use BitcoinExchange
run Sinatra::Application
