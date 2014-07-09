path = File.expand_path "../../../", __FILE__
require "spec_helper"

require 'rack/test'

def app
  BitcoinExchange
end
include Rack::Test::Methods

# enable :sessions

require "#{path}/bitcoin_exchange"


# specs helper methods, TODO: review before using them

def body
  last_response.body
end

def referer
  location = last_response.headers["Location"]
  location.gsub(/http:\/\/example\.org/, '') if location
end

def login(user)
  session[:user_id] = user.id
end

def do_login
  visit "/"
  raise "implement me"
end

def app.current_user
  $spec_current_user
end

def login(user=User.first)
  $spec_current_user = user
end

def clear_login
  $spec_current_user = nil
end