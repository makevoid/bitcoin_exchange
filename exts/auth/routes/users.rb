class BitcoinExchange < Sinatra::Base

  get "/users" do
    @users = User.all
    haml_mod :users
  end

  get "/users/:id" do |id|
    @user = User.get id
    haml_mod :user
  end

  get "/register" do
    @user = User.new
    haml_mod :register, layout: "../exts/auth/views/layout_login".to_sym
  end

  post "/users" do
    @user = User.new params[:user]
    if @user.save
      session[:user_id] = @user.id
      redirect "/"
    else
      haml_mod :register
    end
  end

  get "/users/:id/edit" do |id|
    @user = User.get id
    haml_mod :user_edit
  end

  put "/users/:id" do |id|
    @user = User.get id
    if @user.update(params[:user])
      redirect "/users/#{@user.id}"
    else
      haml_mod :user_edit
    end
  end

end
