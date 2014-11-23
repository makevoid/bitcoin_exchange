path = File.expand_path "../../", __FILE__

ENV["RACK_ENV"] = "test"
require "#{path}/config/env"

RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :should
  end
end


def cleanup!
  DataMapper.auto_migrate!
  R.flushdb
end

# prepare test db

cleanup!


# factories

USER1 = { username: "Ali", email: "ali@example.com", password: "asdasd", password_confirmation: "asdasd" }
USER2 = { username: "Bob", email: "bob@example.com", password: "asdasd", password_confirmation: "asdasd" }