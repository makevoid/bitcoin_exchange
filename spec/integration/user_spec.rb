require "spec_helper"

describe "User spec (exts/auth)" do

  it "integrates into existing dm model" do
    user = User.new
    user.should respond_to :btc_address
    user.should respond_to :username
    user.should respond_to :id
  end

end