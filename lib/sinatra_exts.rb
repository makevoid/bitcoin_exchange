path = File.expand_path "../../", __FILE__

MODS = ["auth"]

LOAD_DATAMAPPER_MODELS = lambda do
  if defined?(DataMapper)
    require_all "exts/#{MODS.first}/models"
  end
end

LOAD_MODULES_ROUTES = lambda do
  # (module system: make the constant from APP_NAME)
  class BitcoinExchange < Sinatra::Base
    def haml_mod(view, options={})
      haml "../exts/#{MODS.first}/views/#{view}".to_sym, options
    end

    def partial_mod(name, value={})
      haml_mod "_#{name}".to_sym, locals: extract_locals(name, value)
    end
  end

  require_all "exts/#{MODS.first}/routes"
end