path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"
require_relative './lib/asset_pipeline'
require 'sinatra/support/i18nsupport'

class BitcoinExchange < Sinatra::Base


  register Sinatra::I18nSupport
  load_locales './config/locales'
  set :default_locale, 'it'

  register AssetPipeline
  use Rack::MethodOverride

  include Voidtools::Sinatra::ViewHelpers
  require "#{PATH}/lib/mixins/html_helpers"
  require "#{PATH}/lib/mixins/formats_helpers"
  require "#{PATH}/lib/mixins/resources_helpers"
  require "#{PATH}/lib/mixins/form_helpers"
  require "#{PATH}/lib/mixins/flashes"

  helpers do
    include ViewHelpers
    include FormatsHelpers
    include ResourcesHelpers
    include FormHelpers
    include Flashes
  end

end

require_all "routes"

LOAD_MODULES_ROUTES.call

# monkeypatch user

class BitcoinExchange < Sinatra::Base
#   def logged_in?
#     current_user
#   end
#
#   def current_user
#     User.get(1)  # FIXME: you can start to code login from here
#   end
#
  def cur_user_balance
    current_user.balance
  end
end



# TEST routes
#
# remove them in production!!
#
#

if App.env != "production"

  class BitcoinExchange < Sinatra::Base

    get "/reset" do
      DataMapper.auto_migrate!
      "DB RESET!<br><br>(remove this route from production!)"
    end

    post "/force_login/:id" do |id|
      return_url = params[:return_url]
      return_url = params[:return_url] if return_url && !return_url.blank?
      session[:user_id] = id.to_i
      redirect return_url || "/"
    end

    # TODO: move all the admin_move dir in admin app

    get "/redis" do
      haml :"../admin/views/redis"
    end
  end

end
