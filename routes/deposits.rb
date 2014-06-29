class BitcoinExchange < Sinatra::Base

  get "/deposits" do
    # list deposits (btc, eur)
    haml :"deposits/index"
  end

  get "/deposits/btc" do
    # info page for btc deposit
    #
    # link to generate address for user
    haml :"deposits/btc"
  end

  get "/deposits/fiat" do
    # instructions and bank details of bank transfer to send fiat
    haml :"deposits/fiat"
  end

end