# ruby jobs/bitstamp_charts.rb


def read_config(file)
  File.read( File.expand_path "~/.#{file}" ).strip
end

def candle_get(seconds=3600)
  `curl -s 'https://www.bitstamp.net/market/tradeview_data/?step=#{seconds}'  -H 'Referer: https://www.bitstamp.net/market/tradeview/' -H 'X-Requested-With: XMLHttpRequest' -H 'Cookie: #{COOKIES}'`
end

COOKIES = read_config :bitstamp_cookies
# POMEMBNO! tu mora biti pravilna koda jezika! from (bitstamp) source code lolll

PATH = "./public/charts/bitstamp_candle_%s.json"

deltas = {
  # name: seconds
  #
  # "3d"  => 259200,
  "1d"  => 86400,
  "12h" => 43200,
  "6h"  => 21600,
  "4h"  => 14400,
  "2h"  => 7200,
  "1h"  => 3600,
  "30m" => 1800,
}

deltas.each do |name, seconds|
  candles = candle_get seconds
  path = PATH % name
  File.open(path, "w"){ |f| f.write candles }
  puts candles
  puts "written in: #{path}"
end



# steps

# sample ouput

# [
#   [1398016800, 500.17, 503.00, 494.31, 500.00, 724.56],
#   ...
# ]

# [
#   [time, open, high, low, close, volume],
#   ...
# ]
