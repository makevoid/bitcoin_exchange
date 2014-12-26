source 'http://rubygems.org'

gem 'yajl-ruby'

gem "sinatra"
gem "json"

gem "blizz"

gem "voidtools"

gem "haml"
gem "sass"

gem "redis"
gem "hiredis" # pipelining

gem "dm-core"
gem "dm-mysql-adapter"
gem "dm-migrations"
gem "dm-validations"

group :bitstamp do
  gem "bitstamp"
end

# gem "rom", git: 'git@github.com:rom-rb/rom'
# # gem "axiom-memory-adapter"
# gem "axiom", git: 'git@github.com:dkubb/axiom'
# gem "axiom-do-adapter", git: 'git@github.com:dkubb/axiom-do-adapter'
# # gem "do_mysql"
# gem 'do_sqlite3'

gem "bitcoin-client", git: "git@github.com:makevoid/bitcoin-client"

group :development do
  gem "guard"
  gem "guard-sass",         require: false
  gem "guard-coffeescript", require: false, github: "guard/guard-coffeescript" # TODO: temporary
  gem "guard-livereload",   require: false
  gem 'guard-concat',       require: false, github: "makevoid/guard-concat"
  # gem 'guard-concat',       require: false, path: "~/apps/guard_concat_eze"
end

group :test do
  gem "rspec-core"
  gem "rspec-mocks"
  gem "rspec-expectations"
  # gem "rspec-refinements" # github: amatsuda/rspec-refinements

  gem "rack-test"
end


# nice gems to consider
#
# orderbook & API: https://github.com/kenichi/angelo
#
# satoshi-unit: https://github.com/snitko/satoshi-unit
