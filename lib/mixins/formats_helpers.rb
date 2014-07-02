module FormatsHelpers
  def time_f(time)
    Time.at(time.to_i).strftime "%d/%m/%Y - %H:%M"
  end
end