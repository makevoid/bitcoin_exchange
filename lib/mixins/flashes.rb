module Flashes

  def flash
    @@flashes ||= {}
  end

  def self.included(base)
    base.send :after do
      @@flashes = {}
    end
  end

end