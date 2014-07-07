# Bitcoin Exchange

### powered by Ruby, Redis and Sinatra

proof of concept

status: under development


### development

launch the app:

    rackup -p 3000
  
dev mode:  
  
    rerun -p "**/*.{rb}" -- rackup -p 3000 


### install notes

you need to install ruby (better 2.1, from source possibly, or via rvm), then

    gem install bundler

into the project directory

    bundle install


then follow the instructions to install bitcoind (bitcoin core - github.com/bitcoin/bitcoin)
copy config/bitcoin.conf.sample to ~/.bitcoin/bitcoin.conf (if in osx, look at the default location mentioned above)

run bitcoind


then run (to create mysql tables)

    ruby lib/tasks/migrate.rb

to start the app

    rackup
    
and connect to http://localhost:9292

### bitcoin - osx

osx bitcoin.conf locaiton:

    /Users/USER/Library/Application Support/Bitcoin/bitcoin.conf
    
symlink:

    mkdir -p ~/.bitcoin
    ln -s "/Users/USER/Library/Application Support/Bitcoin/bitcoin.conf" ~/.bitcoin/
    
# development notes    
    
### useful fontawesome icons

fa-bank
fa-dashboard
fa-money
fa-exchange
fa-laptop
fa-life-ring
fa-question
fa-qrcode
fa-refresh
fa-sign-out
fa-suitcase