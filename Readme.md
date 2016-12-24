##### This is an old proof-of-concept

# See: Newer projects

### Bitcoin Related

### BlockchainPen

## http://github.com/makevoid/blockchain-pen - http://blockchainpen.com

### Paperbank - paper wallet generator:

## http://github.com/makevoid/paperbank - http://paperbank.it

## http://github.com/makevoid/paperbank_pocket - http://pocket.paperbank.it
## http://github.com/makevoid/blockchain_explorer
## http://github.com/720kb/BitNFC - http://bitnfc.org


### Ethereum Related

## http://github.com/appliedblockchain/bapp




---

Original Readme:

#### Bitcoin Exchange

### powered by Ruby, Redis and Sinatra

proof of concept

status: under development


### current implementation idea

use client polling to try to submit order, otherwise raise exception: { error: "polling", message: "please resubmit in previous request in 1s" }

this semplifies the concept of exchange and

in the future consider implementing a redis based queue system with minimal overhead, but right now let the client do the dirty job ;)


### prerequisites

- redis (launched on default port)
- bitcoind

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

create a mysql database (named bitcoin_exchange), you may edit db configs in config/env.rb


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

"When a user is logged in to their account, you show the bitcoin address they can send to to add funds.  Before showing it, you check if it's been used, if it has then you replace it with a new one (getnewaddress <username>).  You only need to keep the latest bitcoin address for the account in your database.  (I posted a sample code fragment for this in an earlier thread somewhere, search on getnewaddress)
" > Satoshi

https://bitcointalk.org/index.php?topic=417.msg3579#msg3579

### running specs

    rspec


### security notes

https://bitcointalk.org/index.php?topic=434.msg3770#msg3770


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

##


- stop order

```ruby
watch ->
  if prezzo == x
    metti ordine limit(prezzo_y)
```


- trailing stop
