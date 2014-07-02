path = File.expand_path "../../../", __FILE__
require "spec_helper"

require 'rack/test'

# Bundler.require :acceptance_test
# require 'capybara/rspec'
# Capybara.javascript_driver = :webkit

def app
  Sinforum
end
include Rack::Test::Methods

enable :sessions


require "#{path}/sinforum"
# Capybara.app = app



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

def sinforum_login
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