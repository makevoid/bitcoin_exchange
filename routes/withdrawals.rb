class BitcoinExchange < Sinatra::Base

  get "/withdrawals" do
    # list withdrawals (btc, eur)
    haml :"withdrawals/index"
  end


  WITHDRAWAL_AMOUNT_MAX = 0.01

  post "/withdrawals" do
    test_address = "1EiNgZmQsFN4rJLZJWt93quMEz3X82FJd2"
    test_address = "1H6mVmUJnG1b2J8iFkN7bqfEV2y1phQ6hc"
    amount = params[:amount].to_f

    return "Amount to withdraw is too high, please contact us or make multiple withdrawals" if amount > WITHDRAWAL_AMOUNT_MAX

    # return "You have requested too many withdrawals, please wait until your previous withdrawals requests are confirmed from the bitcoin network"

    transaction = Wallet.send test_address, amount
    # transaction = "6fb4a472c647f47078e190070d706631618d76a62aad5a47d2c8423ac574131d"

    "debug:<br><h1>BTC sent!</h1><br><br>
    transaction: <a href='https://blockchain.info/tx/#{transaction}'>#{transaction}<a>  <br><br><a href=''>go back to home page</a>"
  end

end