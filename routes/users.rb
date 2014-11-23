class BitcoinExchange < Sinatra::Base

  get "/users/current" do
    login_required
    haml :"users/current"
  end

  CURRENT_ADDRESS = nil

  post "/users/generate_address" do
    # generate a btc address
    active_user_required

    # FIXME: TODO: revise this part completely, it's just for fast demoing purposes
    addresses = Wallet.addresses_only
    CURRENT_ADDRESS ||= addresses[rand(addresses.size)]


    redirect "/deposits"
  end

end
