path = File.expand_path "../../../", __FILE__

require "#{path}/config/env"

DataMapper.auto_migrate!


User.create username: "Ali" # id 1
User.create username: "Bob" # id 2


# Wallet.address_create 1
# Wallet.address_create 2