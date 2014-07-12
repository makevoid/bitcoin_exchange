# require "spec_helper"
require "spec_helper"

# mocks

class Balance
  
  @@btc = 0
  
  def btc=(btc)
    @@btc = btc
  end
  
  def btc
    @@btc
  end
  
end


describe "OrderBook" do
  
  before :all do
    @user  = User.create username: "Ali" 
    @user2 = User.create username: "Bob" 
  end
  
  # it "deposits eur (fake deposit)" do
  # end
  # 
  # it "deposits btc" do
  # end
  
  before :all do
    DepositFiat.create user: @user, amount: 500.0
    DepositBtc.create  user: @user2, amount: 0.9
    @user2.balance.btc = 0.9 # use forced (monkey)mock
  end
  
  # subset 
  
  before :all do
    @order1 = Order.create user_id: @user.id, type: :buy,  amount: 0.1, price: 450
    @order2 = Order.create user_id: @user2.id, type: :sell, amount: 0.1, price: 450
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
  
  it "updates balances" do
    @user.balance.eur.should  == 0
    @user.balance.btc.should  == 0
    @user2.balance.eur.should == 0
    @user2.balance.btc.should == 0  
  end
  
end