# require "spec_helper"
require "spec_helper"

describe "OrderBook" do

  @@user  = User.new id: 0
  @@user2 = User.new id: 1


  
  it "resolves two matching orders" do
    order1 = Order.create user: 0, type: :buy,  amount: 0.1, price: 450
    order2 = Order.create user: 1, type: :sell, amount: 0.1, price: 450
    
    @@user.orders_open.count.should == 0
    @@user2.orders_open.count.should == 0
  end
  
end