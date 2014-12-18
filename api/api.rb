# integration layer

class Order

  attr_reader :id, :type, :user_id, :price, :amount, :created_at
  attr_accessor :canceled_at

  def initialize(id:, type:, user_id:, price:, amount:, created_at:)
    @id         = id
    @type       = type
    @user_id    = user_id
    @price      = price
    @amount     = amount
    @created_at = created_at
  end

  def self.all
    [
      new(id: 1, type: "buy",  user_id: 1, price: 250_00, amount: 0.1),
      new(id: 1, type: "sell", user_id: 1, price: 260_00, amount: 0.15),
    ]
  end

  def self.get(id)
    Order.new id: 1, type: "buy", user_id: 1, price: 250_00, amount: 0.1
  end

  def self.create(id:, type:, user_id:, price:, amount:, created_at:)
    new(id: id, type: type, user_id: user_id, price: price, amount: amount, created_at: created_at).save
  end

  def save
    { succeeded: true, object: self  }
  end

  def self.cancel
    self.canceled_at = Time.now
    self.save
    { succeeded: true, object: self }
  end

end


class Trade < Order

  alias :closed_at :created_at

  # order and trade are very similar

end


# api

class Api < Sinatra::Base

  before do
    content_type :json
  end

  after do
    response.body = response.body.to_json
  end

  # orders

  get "/orders" do
    Order.all
  end

  get "/orders/:id" do |id|
    Order.get id.to_i
  end

  post "/orders" do
    Order.create params[:orders]
  end

  put "/orders/:id/cancel" do |id| # cancel
    Order.get(id).cancel
  end

  # last

  get "/trades" do
    Trade.all # OrderClosed
  end

end


# spec helper



RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :should
  end
end

require 'rack/test'

def app
  Api
end
include Rack::Test::Methods

require 'hashie/mash'
def resp
  Hashie::Mash.new JSON.parse last_response.body
end



# specs

describe Api do
  describe "GET /orders" do
    it "gets all latest orders" do
      get "/orders"
      resp.size.should == 2
      resp.first[:id].should == 1
    end
  end

  describe "GET /orders/:id" do
    get "/orders"
    resp.size.should == 2
    resp.id.should == 1

  end

  describe "POST /orders" do
    xit "is protected" do
      post "/order", {}
      # TODO is very protected
    end

    it "creates an order" do
      post "/order", {}
      resp.succeeded.should be_true
      #resp.order.id.should_not be_nil
    end
  end

  describe "PUT /orders/:id/cancel" do
    xit "is protected" do
      post "/order", {}
      # TODO is very protected
    end

    it "cancels an order" do
      put "/order/1/cancel"
      resp.succeeded.should be_true
    end
  end
end


## Docs

# GET /orders - returns the list of orders
#
#   []

# GET /orders/:id - get info of a single order
#
#   { id: 1, type: "buy" }

# POST /orders - places a limit order
#
#  { succeeded: true, order: {} }
#
#  or
#
#  { succeeded: false, error: { code: "amount_eror", message: "" } }
#  { succeeded: false, error: { code: "price_error", message: "" } }

# PUT /orders/:id/cancel - cancels an order
#
#  { succeeded: true, order: {} }
#  or
#
#  { succeeded: false, error: { code: "already_resolved", message: "Aldready resolved at: x_time" } }
#  { succeeded: false, error: { code: "already_canceled", message: "Aldready canceled at: x_time" } }
