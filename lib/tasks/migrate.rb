path = File.expand_path "../../../", __FILE__

require "#{path}/config/env"

DataMapper.auto_migrate!
R.flushdb


user  = User.create username: "Ali", email: "ali@example.com", password: "asdasd", password_confirmation: "asdasd" # id 1
user2 = User.create username: "Bob", email: "bob@example.com", password: "asdasd", password_confirmation: "asdasd" # id 2

puts user.errors.map{ |e| e }

DepositFiat.create user: user,  amount: 500.0
DepositBtc.create  user: user,  amount: 0.1
DepositFiat.create user: user2, amount: 100.0
DepositBtc.create  user: user2, amount: 1.0


# TODO: last price is last executed order price?
#
# Order.create user_id: user.id,  type: :buy,   amount: 0.1,  price: 505.0
# Order.create user_id: user2.id, type: :sell,  amount: 1,    price: 500.0

# Wallet.address_create 1
# Wallet.address_create 2