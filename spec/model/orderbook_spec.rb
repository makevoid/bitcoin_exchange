# require "spec_helper"
require "spec_helper"

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
    DepositBtc.create  user: @user2, amount: 1.0
    # @user2.balance.btc = 1.0 # use forced (monkey)mock redefining btc method on Balance class
  end
  
  # subset 
  
  
  it "has initial balances" do
    @user.balance.eur.should  == 500.0
    @user.balance.btc.should  == 0
    @user2.balance.eur.should == 0
    @user2.balance.btc.should == 1.0  
  end
  
  describe "with orders" do
  
    before :all do
      @order1 = Order.create user_id: @user.id, type: :buy,  amount: 1.0, price: 500.0
      @order2 = Order.create user_id: @user2.id, type: :sell, amount: 1.0, price: 500.0
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
      @user.balance.btc.should  == 0.99
      @user2.balance.eur.should == 495.0
      @user2.balance.btc.should == 0
    end
  
  end
  
end