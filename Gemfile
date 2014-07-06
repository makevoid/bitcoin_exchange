source 'http://rubygems.org'

gem "sinatra"
gem "json"

gem "blizz"

gem "voidtools"

gem "haml"
gem "sass"

gem "redis"

gem "rom", git: 'git@github.com:rom-rb/rom'
# gem "axiom-memory-adapter"
gem "axiom", git: 'git@github.com:dkubb/axiom'
gem "axiom-do-adapter", git: 'git@github.com:dkubb/axiom-do-adapter'
# gem "do_mysql"
gem 'do_sqlite3'

gem "bitcoin-client", git: "git@github.com:makevoid/bitcoin-client"

group :development do
  gem "guard"
  gem "guard-sass",         require: false
  gem "guard-coffeescript", require: false
  gem "guard-livereload",   require: false
end

group :test do
  gem "rspec-core"
  gem "rspec-mocks"
  gem "rspec-expectations"

  gem "rack-test"
end