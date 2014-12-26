# ruby jobs/bitstamp_charts.rb > public/charts/bitstamp_candle.json

def read_config(file)
  File.read( File.expand_path "~/.#{file}" ).strip
end

cookies = read_config :bitstamp_cookies
# POMEMBNO! tu mora biti pravilna koda jezika! from (bitstamp) source code lolll


# steps

puts `curl -s 'https://www.bitstamp.net/market/tradeview_data/?step=21600'  -H 'Referer: https://www.bitstamp.net/market/tradeview/' -H 'X-Requested-With: XMLHttpRequest' -H 'Cookie: #{cookies}'`

# sample ouput

# [
#   [1398016800, 500.17, 503.00, 494.31, 500.00, 724.56],
#   ...
# ]

# [
#   [time, open, high, low, close, volume],
#   ...
# ]