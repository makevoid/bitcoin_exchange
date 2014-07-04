require "spec_helper"

describe WithdrawalBtc do
  
  it "returns an empty withdrawals array" do
    all = WithdrawalBtc.all
    all.to_a.should == []
  end
  
  it "creates a btc withdrawal request" do
    w = WithdrawalBtc.create user_id: 1, amount: 123
    all = WithdrawalBtc.all
    all.to_a.size.should == 1
    all.to_a.should eql? [w]
  end
  
end