class BitcoinExchange < Sinatra::Base

  get "/withdrawals" do
    # list withdrawals (btc, eur)
    haml :"withdrawals/index"
  end


end