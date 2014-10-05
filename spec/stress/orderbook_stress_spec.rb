# require "spec_helper"
require "spec_helper"

describe "OrderBook" do
  before :all do
    # @num = 500
    @num = 100      
    # @num = 50
    @num = 5
  end


  # describe "creates many non-matching orders" do
  #     before :all do
  #       @user  = User.create username: "Ali"
  #       @user2 = User.create username: "Bob"
  # 
  #       DepositFiat.create user: @user, amount: 1000.0
  #       DepositBtc.create  user: @user2, amount: 10.0
  #       
  #       @num.times do |i|
  #         price = 500.0 - (i.to_f+1)/100
  #         # puts price
  #         Order.create user_id: @user.id, type: :buy,  amount: 0.0001, price: price
  #       end
  #       @num.times do |i|
  #         price = 500.0 + (i.to_f+1)/100
  #         Order.create user_id: @user2.id, type: :sell, amount: 0.0001, price: price
  #       end
  #     end
  # 
  #     it "resolves the matching orders" do
  #       @user.orders_open.count.should  == @num
  #       @user2.orders_open.count.should == @num
  #       @user2.orders_open.last.should eql? @order4
  #     end
  # 
  #     after(:all){ cleanup! }
  #   end

  describe "creates many matching orders" do
    before :all do
      @num = 2
      
      @user  = User.create username: "Ali"
      @user2 = User.create username: "Bob"

      DepositFiat.create user: @user, amount: 1000.0
      DepositBtc.create  user: @user2, amount: 10.0
      
      @num.times do |i|
        price = 500.0 + (i.to_f+1)/100
        Order.create user_id: @user.id, type: :buy,  amount: 0.0001, price: price
      end
      @num.times do |i|
        price = 500.0 - (i.to_f+1)/100
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