path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"

class BitcoinExchange < Sinatra::Base
  include Voidtools::Sinatra::ViewHelpers
  require "#{PATH}/lib/mixins/helpers"
  helpers do
    include ViewHelpers
  end

  def logged_in?
    # TODO: implement login
    #
    # project status atm: in development

    true
  end
end

require_all "routes"
