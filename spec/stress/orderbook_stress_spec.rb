# require "spec_helper"
require "spec_helper"

describe "OrderBook" do

  describe "creates many orders" do
    before :all do
      @user  = User.create username: "Ali"
      @user2 = User.create username: "Bob"

      DepositFiat.create user: @user, amount: 1000.0
      DepositBtc.create  user: @user2, amount: 10.0

      # @num = 1000
      # @num = 100
      @num = 10
      
      @num.times do |i|
        price = 500.0 - i.to_f/100
        # puts price
        Order.create user_id: @user.id, type: :buy,  amount: 0.0001, price: price
      end
      @num.times do |i|
        price = 500.0 + i.to_f/100
        Order.create user_id: @user2.id, type: :sell, amount: 0.0001, price: price
      end
    end

    it "resolves the matching orders" do
      @user.orders_open.count.should  == @num
      @user2.orders_open.count.should == @num
      @user2.orders_open.last.should eql? @order4
    end


    after(:all){ cleanup! }
  end

end