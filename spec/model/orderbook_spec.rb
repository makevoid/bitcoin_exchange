# require "spec_helper"
require "spec_helper"

describe "OrderBook" do
  
  before :all do
    @user  = User.new id: 0
    @user2 = User.new id: 1
  end
  
  # subset 
  
  before :all do
    @order1 = Order.create user_id: 0, type: :buy,  amount: 0.1, price: 450
    @order2 = Order.create user_id: 1, type: :sell, amount: 0.1, price: 450
  end
  
  it "matches orders" do
    orders = Orderbook.matching_orders( @order1 )
    orders.should eql? [@order2]
  end
  
  # it "matches orders maintaining direction" do
  #   
  # end
  
  it "resolves two matching orders" do
    @user.orders_open.count.should  == 0
    @user2.orders_open.count.should == 0    
  end
  
  
  
end