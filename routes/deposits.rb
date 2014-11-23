class DepositAmountExceedLimit
  def message
    "The amount you want to deposit is too high, please contact us or make multiple deposits. Current deposit limit: EUR: #{DEPOSIT_EUR_AMOUNT_MAX.f_eur}, BTC: #{DEPOSIT_BTC_AMOUNT_MAX}."
  end
end

class BitcoinExchange < Sinatra::Base

  DEPOSIT_BTC_AMOUNT_MAX = 0.01
  DEPOSIT_EUR_AMOUNT_MAX = 100

  get "/deposits" do
    # list deposits (btc, eur)
    login_required
    haml :"deposits/index"
  end

  get "/deposits/btc" do
    login_required
    deposit_amount_validate
    # info page for btc deposit
    #
    # link to generate address for user
    haml :"deposits/btc"
  end

  get "/deposits/fiat" do
    login_required
    deposit_amount_validate
    # instructions and bank details of bank transfer to send fiat
    haml :"deposits/fiat"
  end

  private

  def deposit_amount_validate
    amount_too_high =
    raise  amount_too_high if params[:type] == :btc && params[:amount] > DEPOSIT_BTC_AMOUNT_MAX
    return amount_too_high if params[:type] == :eur && params[:amount] > DEPOSIT_EUR_AMOUNT_MAX
  end

end