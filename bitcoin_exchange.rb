path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"

class BitcoinExchange < Sinatra::Base
  include Voidtools::Sinatra::ViewHelpers
  require "#{PATH}/lib/mixins/helpers"
  helpers do
    include ViewHelpers
  end
  
  # TODO: implement login
  #
  # project status atm: in development

  def logged_in?
    @current_user
  end
  
  def current_user
    @current_user = CURRENT_USER
  end
end

require_all "routes"
