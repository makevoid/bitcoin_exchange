module Timeable
  def time_f
    strftime "%d/%m/%Y - %H:%M"
  end
end

class DateTime
  include Timeable
end

class Time
  include Timeable
end