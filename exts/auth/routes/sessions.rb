class BitcoinExchange < Sinatra::Base

  enable :sessions
  set :session_secret, SESSION_SECRET
  # use Rack::Session::Cookie

  def login_required
    unless current_user
      flash[:notice] = "Log in to access this area."
      halt haml_mod :login
    end
  end

  def active_user_required
    halt 403, haml_mod(:active_user_required) unless active_user?
  end

  def admin_required
    halt 403, haml_mod(:admin_required) unless admin?
  end

  def current_user
    return self.class.current_user if defined?(self.class.current_user) # for test sake
    if id = session[:user_id]
      User.get id
    end
  end

  def logged_in?
    current_user
  end

  def admin?
    current_user && current_user.admin?
  end

  def active_user?
    current_user && (admin? || current_user.active_user?)
  end

  def me?
    @user == current_user
  end

  get "/login" do
    haml_mod :login
  end

  post "/sessions" do
    @user = User.first(username: params[:user][:username]) if params[:user]
    if @user && @user.password?(params[:user][:password])
      # flash[:notice] = "Logged in!"
      session[:user_id] = @user.id
      redirect "/"
    else
      flash[:alert] = "Invalid username or password."
      haml_mod :login
    end
  end

  post "/logout" do
    session[:user_id] = nil
    redirect "/"
  end

end
