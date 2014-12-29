// chart candlestick

var margin = {top: 20, right: 20, bottom: 30, left: 50},
           width = 900 - margin.left - margin.right,
           height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

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

d3.csv("/bitstamp_csv/bitstamp.csv", function(error, data) {
   var accessor = candlestick.accessor();

   data = data.slice(0, 200).map(function(d) {
       return {
           date: parseDate(d.Date),
           open: +d.Open,
           high: +d.High,
           low: +d.Low,
           close: +d.Close,
           volume: +d.Volume
       };
   }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

   x.domain(data.map(accessor.d));
   y.domain(techan.scale.plot.ohlc(data, accessor).domain());

   svg.append("g")
           .datum(data)
           .attr("class", "candlestick")
           .call(candlestick);

   svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis);

   svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Price (€)");
});

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
      .text("Price ($)")

  chart_price.svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", chart_price.line)
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