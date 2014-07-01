path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"

class BitcoinExchange < Sinatra::Base
  use Rack::MethodOverride

  include Voidtools::Sinatra::ViewHelpers
  require "#{PATH}/lib/mixins/helpers"
  helpers do
    include ViewHelpers
  end

  # TODO: implement login
  #
  # project status atm: in development

  def logged_in?
    current_user
  end

  @@current_user = nil

  def current_user
    @@current_user || USERS[0]  # FIXME: you can start to code login from here
  end
end

require_all "routes"


# TEST routes
#
# remove them in production!!
#
#

USERS = [
  User.new(id: 0, username: "Ali"),
  User.new(id: 1, username: "Bob"),
]

class BitcoinExchange < Sinatra::Base

  post "/force_login/:id" do |id|
    @@current_user = USERS[id.to_i]
    redirect "/"
  end

end