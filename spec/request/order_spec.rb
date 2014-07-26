require_relative "spec_helper"

def create_users
  @user  = User.create username: "Ali"
  @user2 = User.create username: "Bob"
end

describe "Orders" do

  before :all do
    create_users
  end

  it "logs user (Ali)" do
    # post "/login"
    get "/"
    body.should =~ /Ali/
  end

  it "makes a deposit" do
    # fake, mabe fake it another way?
    post "/deposits/fake_add"
    DepositFiat.count.should == 1
  end

  it "places an order [buy]" do
    @order_buy = { type: :buy, amount: 0.1, price: 500.0 }
    post "/orders", { order: @order_buy }
    Order.buy.size.should == 1 # todo: techeck the Order#buy implementation :)
  end

  it "switches user" do
    post "/force_login/2"
    get "/"
    body.should =~ /Bob/
  end

  it "makes a btc deposit" do
    # TODO: fixme, temporary
    # DepositBtc.create ? nah!
    R["users:#{@user2.id}:balance_btc"] = 0.05
  end

  it "places an order [sell]" do
    @order_sell = { type: :sell, amount: 0.05, price: 495.0 }
    post "/orders", { order: @order_sell }
  end

  it "checks if the order is resolved" do
    # open is missing
    Order.sell.size.should  == 0
    Order.buy.size.should   == 1

    # closed is present (and first)
    OrderClosed.all.size.should   == 1
  end


  after(:all){ cleanup! }
end