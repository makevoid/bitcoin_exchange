// libs

var each = function(arr, cb) {
  if(arr == null) {
    return;
  } else if (Array.prototype.forEach && arr.forEach === Array.prototype.forEach) {
    arr.forEach(cb);
  } else {
    for(var i = 0; i < arr.length; i++) {
      (function() {
        cb(arr[i], i, arr);
      })();
    }
  }
}


// chart candlestick

var candle = {}

var deltas = {
  // name: seconds
  //
  // "3d":  259200,
  "1d":  86400,
  "12h": 43200,
  "6h":  21600,
  "4h":  14400,
  "2h":  7200,
  "1h":  3600,
  "30m": 1800
}



var margin = {top: 20, right: 20, bottom: 30, left: 50},
           width = 900 - margin.left - margin.right,
           height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%d-%b-%y").parse;
var parseDateUnix = function(unixtime) {
  return new Date(unixtime * 1000)
}

var x = techan.scale.financetime()
       .range([0, width]);

var y = d3.scale.linear()
       .range([height, 0]);

var candlestick = techan.plot.candlestick()
       .volumeOpacity(false) // Set to true for volume opacity
       .xScale(x)
       .yScale(y);

var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom");

var yAxis = d3.svg.axis()
       .scale(y)
       .orient("left");

var svg = d3.select("#chart_candlestick").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

candle.map = function(d) {
  var date   = d[0]
  var open   = d[1]
  var high   = d[2]
  var low    = d[3]
  var close  = d[4]
  var volume = d[5]

  row = {
    date:   parseDateUnix(date),
    open:   +open,
    high:   +high,
    low:    +low,
    close:  +close,
    volume: +volume
  }
  // console.log(row)

  return row;
}

var accessor = candlestick.accessor();

candle.sort = function(a, b) {
  return d3.ascending(accessor.d(a), accessor.d(b))
}

var render_candlestick = function(step_time) {
  var step = "6h"
  if (step_time)
    step = step_time

  var file_name = charts["price_bitstamp"]
  file_name = file_name +"_"+ step + ".json"

  d3.json(file_name, function(error, data) {

    svg.selectAll("*").remove()

    if (!data) {
      console.error("empty data: "+file_name)
    } else {
      console.log("chart: 'candlestick', status: 'loaded', entries: ", data.length)
    }

    // data = data.slice(0, 200).map(function(d) {
    data = data.map(candle.map).sort(candle.sort)

    x.domain(data.map(accessor.d));
    y.domain(techan.scale.plot.ohlc(data, accessor).domain())

    svg.append("g")
           .datum(data)
           .attr("class", "candlestick")
           .call(candlestick)

    svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis)

    svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Price (USD)")
           //.text("Price (€)")
  });
}


var candlestick_change_step = function(evt) {
  var step = evt.target.dataset.step
  render_candlestick(step)
}

var bind_candlestick_buttons = function() {
  var steps = document.querySelectorAll("a[data-step]")
  each(steps, function(step){
    step.addEventListener("click", candlestick_change_step)
  })
}

render_candlestick()
bind_candlestick_buttons()


// chart price

var parseDateIso = d3.time.format("%F %T").parse;

chart_price = {}

chart_price.x = d3.time.scale()
    .range([0, width])

chart_price.y = d3.scale.linear()
    .range([height, 0])

chart_price.xAxis = d3.svg.axis()
    .scale(chart_price.x)
    .orient("bottom")

chart_price.yAxis = d3.svg.axis()
    .scale(chart_price.y)
    .orient("left")

chart_price.line = d3.svg.line()
    // .interpolate("basis")
    .interpolate("bundle")
    .x(function(d) { return chart_price.x(d.date); })
    .y(function(d) { return chart_price.y(d.price); })



chart_price.svg = d3.select("#chart_price").append("svg")
    .attr("width",  width  + margin.left  + margin.right )
    .attr("height", height + margin.top   + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("/api/transactions", function(error, data) {

  data.forEach(function(d) {
    d.date  = new Date(d.time)
    d.price = +d.price
  });

  chart_price.x.domain(d3.extent(data, function(d) { return d.date;  }))
  chart_price.y.domain(d3.extent(data, function(d) { return d.price; }))

  chart_price.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(chart_price.xAxis)

  chart_price.svg.append("g")
      .attr("class", "y axis")
      .call(chart_price.yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price (USD)")
      //.text("Price (EUR)")

  chart_price.svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", chart_price.line)
});


// orderbook chart


chart_orderbook = {}

chart_orderbook.x = d3.scale.linear()
    .range([0, width])

chart_orderbook.y = d3.scale.linear()
    .range([height, 0])

chart_orderbook.xAxis = d3.svg.axis()
    .scale(chart_orderbook.x)
    .orient("bottom")

chart_orderbook.yAxis = d3.svg.axis()
    .scale(chart_orderbook.y)
    .orient("left")

chart_orderbook.line = d3.svg.line()
    // .interpolate("basis")
    .interpolate("bundle")
    .x(function(d) { return chart_orderbook.x(d.price); })
    .y(function(d) { return chart_orderbook.y(d.amount); })

chart_orderbook.svg = d3.select("#chart_orderbook").append("svg")
    .attr("width",  width  + margin.left  + margin.right )
    .attr("height", height + margin.top   + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("/api/orderbook", function(error, data) {
  // data = data["bids"]
  asks = data["asks"]
  bids = data["bids"]

  asks = asks//.slice(0, 100)
  bids = bids.reverse().slice(0, 100)

  // data = asks.concat(bids)
  data = asks

  data.forEach(function(d) {
    d.price = +d.price
    d.amount = +d.amount
  });

  chart_orderbook.x.domain(d3.extent(data, function(d) { return d.price;  }))
  chart_orderbook.y.domain(d3.extent(data, function(d) { return d.amount; }))

  chart_orderbook.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(chart_orderbook.xAxis)
    .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price (USD)")
      //.text("Price (EUR)")

  chart_orderbook.svg.append("g")
      .attr("class", "y axis")
      .call(chart_orderbook.yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price (USD)")
      //.text("Price (EUR)")

  chart_orderbook.svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", chart_orderbook.line)
});

/////////////////

///

// var data = [1, 2, 4, 5, 7]



// var circle = svg_price.selectAll("circle")
//       .data(data)

// data.map(function(dat){
//   var x = dat.x
//   var y = dat.y

//   circle.enter().append("circle")
//         .attr("cx", x)
//         .attr("cy", y)
//         .attr("r", 4.5);
// })


// svg.append("g")
//   .datum(data)
//   .attr("class", "candlestick")
//   .call(candlestick);


// chart orderbook

// var svg_price = d3.select("#chart_orderbook").append("svg")
//        .attr("width", width + margin.left + margin.right)
//        .attr("height", height + margin.top + margin.bottom)
//        .append("g")
//        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// d3.json("/api/orderbook", function(error, json) {
//   // if (error) return console.warn(error)
//   // console.log(data)
// });