require "spec_helper"

describe WithdrawalBtc do

  before :all do
    @user  = User.create USER1
  end

  it "returns an empty withdrawals array" do
    all = WithdrawalBtc.all
    all.to_a.should == []
  end

  it "creates a btc withdrawal request" do
    w = WithdrawalBtc.create user_id: @user.id, amount: 123.0
    all = WithdrawalBtc.all
    all.to_a.size.should == 1
    all.to_a.should eql? [w]
  end

  after(:all){ cleanup! }
end