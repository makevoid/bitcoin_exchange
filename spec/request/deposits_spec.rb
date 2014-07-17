require_relative "spec_helper"

describe "Deposits" do

  # it "" do

  it "test deposit spec" do
    # visit "/force_login"
    # submit_form "/force_login/1"
    post "/force_login/1"

    body.should =~ /Ali/
  end

end