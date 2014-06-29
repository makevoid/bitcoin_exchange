path = File.expand_path '../../', __FILE__

require "#{path}/config/env.rb"

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

end
