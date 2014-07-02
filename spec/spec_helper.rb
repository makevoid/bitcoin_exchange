path = File.expand_path "../../", __FILE__

ENV["RACK_ENV"] = "test"
require "#{path}/config/env"