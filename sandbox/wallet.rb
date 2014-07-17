# the sandbox directory must be monitored carefully for code changes and permissions, here it resides the wallet code


# FIXME: note this code is test purposes only

# FIXME: please refactor, move the bitcoin rcp server/wallet/deamon to another server and connect trough ssl, anyway don't put all the funds there
# note: use diligently rpcport and rpcallowip

# there should be a cold storage (cold: disconnected from any network) having the majour percentage of the funds


bitcoin_conf = File.read File.expand_path("~/.bitcoin/bitcoin.conf")

# sorry, naive approach
USER = bitcoin_conf.lines[0].split("=")[1].strip
PASS = bitcoin_conf.lines[1].split("=")[1].strip
PORT = 3333

require 'bitcoin-client'

class WalletConnectionBroken < RuntimeError
  def message
    # TODO: notify via email / sms here
    "Can't connect to secondary server, this incident has been reported, please try again in few minutes [dev notes: connection is broken or wrong ip address in a newly generated configuration]"
  end
end

class WalletConnectionRefused < RuntimeError
  def message
    # TODO: notify via email / sms here
    "Can't connect to secondary server, this incident has been reported, please try again in few minutes [dev notes: connection is ok, wrong port or user//pass combination in a newly generated configuration]"
  end
end

class UserWallet
  # store: redis / file store?

  def self.initialize(user_id)
    # get address from id, it is important to get the right address and to backup the datastore frequently
  end

end

class Wallet
  def self.client
    # FIXME: TODO: secure it!!!
    #
    # BitcoinClient('username', 'password', :host => 'example.com', :port => 38332, :ssl => true)
    begin
      @@client ||= BitcoinClient(USER, PASS, port: PORT)
    rescue RestClient::ServerBrokeConnection
      raise WalletConnectionBroken
    rescue Errno::ECONNREFUSED
      raise WalletConnectionRefused
    end
  end

  def self.getinfo
    client.getinfo
  end

  # returns the balance of one account
  def self.balance_user(user_id)
    client.getbalance user_id.to_s
  end

  # returns the balance of all accounts
  def self.balance
    client.listaccounts
  end

  def self.balance_admin
    client.balance # returns the balance of all address contained in the wallet, just for admin purposes
  end

  def self.address_create(user_id)
    # TODO: increase security, use different private keys or different deamons maybe?
    client.getnewaddress user_id.to_s
  end


  def self.addresses
    client.listreceivedbyaddress(0, true)
  end

  def self.addresses_only
    addresses.map{ |addr| addr["address"] }
  end

  def self.send_btc(bitcoinaddress, amount, comment = nil, comment_to = nil)
    client.sendtoaddress(bitcoinaddress, amount, comment, comment_to)
  end

  #def sendmany(fromaccount, addresses_amounts, minconf = 1,
end

test_address_1 = "1EiNgZmQsFN4rJLZJWt93quMEz3X82FJd2" # kryptokit

# p Wallet.getinfo

# p transaction = Wallet.send_btc test_address_1, 0.001

# p address = Wallet.address_create

# Wallet.balance

# put bounty here, if you can write code here you can take the bounty and kthxbye


# Wallet.balance