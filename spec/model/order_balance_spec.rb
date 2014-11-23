require "spec_helper"

describe Order do

  describe "balance eur" do

    before :all do
      @user = User.create USER1
    end

    before :all do
      @deposit = DepositFiat.create user: @user, amount: 500.0
    end

    it "saves the deposit" do
      @deposit.should be_saved
    end

    it "shows deposited balance in user" do
      @user.balance.eur.should == 500.0
    end

    it "shows zero fiat balance in orders" do
      Order.balance_eur(@user).should == 0
    end

    context "with order" do

      before :all do
        @order = Order.create user_id: @user.id, type: :buy, amount: 1.0, price: 500.0
      end

      it "shows the fiat balance in orders" do
        Order.balance_eur(@user).should == 500.0
      end

    end

    after :all do
      DataMapper.auto_migrate!
      R.flushdb
    end

  end


  describe "balance btc" do

    before :all do
      @user = User.create USER1
    end

    before :all do
      DepositBtc.create user: @user, amount: 1.0
    end

    it "shows deposited balance in user" do
      @user.balance.btc.should == 1.0
    end

    it "shows zero btc balance in orders" do
      Order.balance_btc(@user).should == 0
    end

    context "with order" do

      before :all do
        @order = Order.create user_id: @user.id, type: :sell, amount: 1.0, price: 500.0
      end

      it "shows the fiat balance in orders" do
        Order.balance_btc(@user).should == 1.0
      end

    end

    after :all do
      DataMapper.auto_migrate!
      R.flushdb
    end

  end


end