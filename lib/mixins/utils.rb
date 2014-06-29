module Utils
  def require_all(path)
    Dir.glob("#{path}/**/*.rb") do |model|
      require model
    end
  end
end