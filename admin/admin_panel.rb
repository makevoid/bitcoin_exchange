path = File.expand_path '../../', __FILE__

require "#{path}/config/env.rb"

# admin panel reuses the same views
# admin doesn't shares same login as the user

class AdminPanel < Sinatra::Base
  include Voidtools::Sinatra::ViewHelpers

  get "/orders" do

  end

  get "/deposits" do

  end

  get "/withdrawals" do

  end

  get "/users" do

  end

  get "/redis" do
    # TODO: already implemented, get it from bitcoin_exchange.rb -> get "/redis"
  end

end
