path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"

class BitcoinExchange < Sinatra::Base
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

    def cur_user_balance
      current_user.balance
    end
  end
end

require_all "routes"

LOAD_MODULES_ROUTES.call


# TEST routes
#
# remove them in production!!
#
#

if App.env != "production"

  class BitcoinExchange < Sinatra::Base

    # get "/reset" do
    #   DataMapper.auto_migrate!
    #   "DB RESET!<br><br>(remove this route from production!)"
    # end

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
