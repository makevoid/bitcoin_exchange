path = File.expand_path "../../../", __FILE__
ENV["RACK_ENV"] = "test"
require "#{path}/config/env"


DataMapper.auto_migrate!
R.flushdb

@times = 100 # times to execute benchmark
@num   = 5  # num trades to match

@user  = User.create username: "Ali"
@user2 = User.create username: "Bob"

DepositFiat.create user: @user, amount: 1000.0
DepositBtc.create  user: @user2, amount: 10.0

require 'benchmark'

puts Benchmark.measure {
  
  @times.times do
  
    @num.times do |i|
      price = 500.0 + (i.to_f)/10
      Order.create user_id: @user.id,  type: :buy,  amount: 0.0001, price: price
    end
    @num.times do |i|
      price = 500.0 - (i.to_f)/10
      Order.create user_id: @user2.id, type: :sell, amount: 0.0001, price: price
    end
  
  end
  
}

DataMapper.auto_migrate!
R.flushdb