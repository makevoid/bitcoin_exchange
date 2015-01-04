module Utils
  def require_all(path)
    Dir.glob("#{PATH}/#{path}/**/*.rb") do |model|
      # puts "requiring: #{model}"
      require model
    end
  end
end