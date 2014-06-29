path = File.expand_path '../../', __FILE__
APP = "bitcoin_exchange"

require "bundler/setup"
Bundler.require :default

require "#{path}/lib/mixins/utils"
include Utils

def app_env
  ENV["RACK_ENV"] || "development"
end


R = Redis.new

