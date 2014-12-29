require 'rake/tasklib'
require 'rake/sprocketstask'
require './bitcoin_exchange'

namespace :assets do
  desc 'Precompile assets'
  task :precompile do
    environment = BitcoinExchange.assets
    manifest = Sprockets::Manifest.new(environment.index, File.join(BitcoinExchange.assets_path, "manifesto.json"))
    manifest.compile(BitcoinExchange.assets_precompile)
  end

  desc "Clean assets"
  task :clean do
    FileUtils.rm_rf(BitcoinExchange.assets_path)
  end
end
