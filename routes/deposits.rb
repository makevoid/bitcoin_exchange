class BitcoinExchange < Sinatra::Base
  
  get "/deposits" do
    # list deposits (btc, eur)
    
  end
  
  get "/deposits/btc"
    # info page for btc deposit
    #
    # link to generate address for user
  end
  
  get "/deposits/fiat"
    # instructions and bank details of bank transfer to send fiat 
  end
  
end