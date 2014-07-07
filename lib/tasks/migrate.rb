path = File.expand_path "../../../", __FILE__

require "#{path}/config/env"

DataMapper.auto_migrate!