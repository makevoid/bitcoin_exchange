# require "spec_helper"
require "spec_helper"

describe "OrderBook" do

  before :all do
    @user  = User.create USER1
    @user2 = User.create USER2
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
      @order1 = Order.create user_id: @user.id,  type: :buy,  amount: 1.0, price: 500.0
      @order2 = Order.create user_id: @user2.id, type: :sell, amount: 1.0, price: 500.0
    end

    it "matches orders" do
      orders = Orderbook.matching_order( @order1 )
      orders.should eql? @order2
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

    after(:all){ cleanup! }
  end

  describe "with not totally matching orders" do
    before :all do
      @user  = User.create USER1
      @user2 = User.create USER2

      DepositFiat.create user: @user, amount: 500.0
      DepositBtc.create  user: @user2, amount: 0.2

      @order2 = Order.create user_id: @user2.id, type: :sell, amount: 0.1, price: 500.0
      @order3 = Order.create user_id: @user2.id, type: :sell, amount: 0.1, price: 500.0
      @order1 = Order.create user_id: @user.id,  type: :buy,  amount: 1.0, price: 500.0
    end

    it "resolves the matching orders" do
      @user.orders_open.count.should  == 1
      @user2.orders_open.count.should == 0
    end

    it "update the volume of the big order" do
      @order1.amount.should == 0.8
    end

    after(:all){ cleanup! }
  end

  describe "with not totally matching orders [sell]" do
    before :all do
      @user  = User.create USER1
      @user2 = User.create USER2

      DepositFiat.create user: @user,  amount: 100.0
      DepositBtc.create  user: @user2, amount: 1.0

      @order1 = Order.create user_id: @user.id,  type: :buy,  amount: 0.1, price: 500.0
      @order2 = Order.create user_id: @user.id,  type: :buy,  amount: 0.1, price: 500.0
      @order3 = Order.create user_id: @user2.id, type: :sell, amount: 1,   price: 500.0
    end

    it "resolves the matching orders" do
      @user.orders_open.count.should  == 0
      @user2.orders_open.count.should == 1
    end

    it "update the amount of the big order" do
      @order3.amount.should == 0.8
    end

    it "updates balances" do
      @user.balance.eur.should  == 0
      @user.balance.btc.should  == 0.198
      @user2.balance.eur.should == 99.0
      @user2.balance.btc.should == 0.8
    end

    after(:all){ cleanup! }
  end


  describe "different prices" do
    before :all do
      @user  = User.create USER1
      @user2 = User.create USER2

      DepositFiat.create user: @user, amount: 100.0
      DepositBtc.create  user: @user2, amount: 1.11

      @order1 = Order.create user_id: @user.id,  type: :buy,  amount: 0.1, price: 500.0
      @order2 = Order.create user_id: @user.id,  type: :buy,  amount: 0.1, price: 495.0
      @order3 = Order.create user_id: @user2.id, type: :sell, amount: 1,   price: 495.0
      @order4 = Order.create user_id: @user2.id, type: :sell, amount: 0.1, price: 505.0 # should not match
    end

    it "resolves the matching orders" do
      @order3.should_not receive(:resolve!)
      @user.orders_open.count.should  == 0
      @user2.orders_open.count.should == 2
      @user2.orders_open.last.should eql? @order4
      # if it fails maybe it needs different order
      # @user2.orders_open.first.should eql? @order4
    end

    it "doesn't match orders" do
      @order4.should be_an Order
      orders = Orderbook.matching_order( @order4 )
      orders.should be_a(NullOrder)
    end

    it "update the amount of the big order" do
      @order3.amount.should == 0.8
    end

    it "updates balances" do
      @user.balance.eur.should  == 0.5 # TODO: TORNA?
      @user.balance.btc.should  == 0.198
      @user2.balance.eur.to_f.should == 98.01
      @user2.balance.btc.should == 0.91
    end

    after(:all){ cleanup! }
  end

  # TODO: spec create partial closed order for not completely drained order!

  # speed test - orderbook
  # 10k BUY orders in a second
  # 1 sell order with matching volume
  # multiple users
  # check all balances

  describe "three orders U1/BUY/0.1/504 U1/BUY/0.1/505 U2/SELL/504 " do
    before :all do
      @user  = User.create username: "Ali"
      @user2 = User.create username: "Bob"

      DepositFiat.create user: @user, amount: 100.0
      DepositBtc.create  user: @user2,  amount: 1.0
    end

    it "works" do
      Order.create user_id: @user.id, type: :buy,  amount: 0.1, price: 504
      Order.create user_id: @user.id, type: :buy,  amount: 0.1, price: 505
      Order.create user_id: @user2.id, type: :sell,  amount: 0.1, price: 504
    end
  end

end