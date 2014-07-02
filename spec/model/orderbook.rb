# require "spec_helper"
require_relative "../spec_helper"

USER  = User.new id: 0
USER2 = User.new id: 1


describe "OrderBook" do
  
  it "resolves two matching orders" do
    order1 = Order.create user: 0, type: :buy,  amount: 0.1, price: 450
    order2 = Order.create user: 1, type: :sell, amount: 0.1, price: 450
    
    USER.orders_open.count.should == 0
    USER2.orders_open.count.should == 0
  end
  
end