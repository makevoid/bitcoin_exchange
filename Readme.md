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

osx bitcoin.conf locaiton:

    /Users/makevoid/Library/Application Support/Bitcoin/bitcoin.conf
    
symlink:

    mkdir -p ~/.bitcoin
    ln -s "/Users/makevoid/Library/Application Support/Bitcoin/bitcoin.conf" ~/.bitcoin/