class User

  attr_reader :id

  def initialize(id: id)
    @id = id
  end

  # store: sql
  def self.test_user
    @@test_user = new(id: 1)
  end
end