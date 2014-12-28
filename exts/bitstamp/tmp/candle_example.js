var sample2 = [
    {"time": 1387212120, "open": 368, "close": 275, "high": 380, "low": 158},
    {"time": 1387212130, "open": 330, "close": 350, "high": 389, "low": 310},
    {"time": 1387212140, "open": 213, "close": 253, "high": 289, "low": 213},
    {"time": 1387212150, "open": 180, "close": 150, "high": 189, "low": 110},
    {"time": 1387212160, "open": 310, "close": 350, "high": 389, "low": 310},
    {"time": 1387212170, "open": 213, "close": 253, "high": 289, "low": 213},
    {"time": 1387212180, "open": 190, "close": 150, "high": 189, "low": 110},
    {"time": 1387212190, "open": 362, "close": 530, "high": 589, "low": 510},
    {"time": 1387212200, "open": 409, "close": 356, "high": 300, "low": 510},
    {"time": 1387212210, "open": 334, "close": 275, "high": 369, "low": 185},
    {"time": 1387212220, "open": 304, "close": 389, "high": 389, "low": 310},
    {"time": 1387212230, "open": 395, "close": 235, "high": 289, "low": 213},
    {"time": 1387212240, "open": 339, "close": 148, "high": 189, "low": 110},
    {"time": 1387212250, "open": 310, "close": 350, "high": 389, "low": 310},
    {"time": 1387212260, "open": 283, "close": 253, "high": 289, "low": 213},
    {"time": 1387212270, "open": 290, "close": 350, "high": 189, "low": 110},
    {"time": 1387212280, "open": 448, "close": 550, "high": 624, "low": 510},
    {"time": 1387212290, "open": 419, "close": 299, "high": 194, "low": 510},
    {"time": 1387212300, "open": 150, "close": 163, "high": 189, "low": 145},
    {"time": 1387212310, "open": 330, "close": 350, "high": 356, "low": 310},
    {"time": 1387212320, "open": 213, "close": 253, "high": 289, "low": 213},
    {"time": 1387212330, "open": 180, "close": 150, "high": 189, "low": 110},
    {"time": 1387212340, "open": 310, "close": 350, "high": 389, "low": 310},
    {"time": 1387212350, "open": 213, "close": 253, "high": 289, "low": 213},
    {"time": 1387212360, "open": 190, "close": 150, "high": 230, "low": 110},
    {"time": 1387212370, "open": 408, "close": 301, "high": 382, "low": 245},
    {"time": 1387212380, "open": 330, "close": 356, "high": 404, "low": 230},
    {"time": 1387212390, "open": 183, "close": 143, "high": 190, "low": 31},
    {"time": 1387212400, "open": 183, "close": 265, "high": 271, "low": 165},
    {"time": 1387212410, "open": 395, "close": 253, "high": 424, "low": 213},
    {"time": 1387212420, "open": 339, "close": 379, "high": 446, "low": 275},
    {"time": 1387212430, "open": 310, "close": 350, "high": 389, "low": 310},
    {"time": 1387212440, "open": 283, "close": 253, "high": 289, "low": 213},
    {"time": 1387212450, "open": 162, "close": 350, "high": 189, "low": 122},
    {"time": 1387212460, "open": 452, "close": 361, "high": 525, "low": 329},
    {"time": 1387212470, "open": 173, "close": 281, "high": 312, "low": 141},
    {"time": 1387212480, "open": 183, "close": 265, "high": 271, "low": 165},
    {"time": 1387212490, "open": 395, "close": 253, "high": 424, "low": 213},
    {"time": 1387212500, "open": 339, "close": 379, "high": 446, "low": 275},
    {"time": 1387212510, "open": 310, "close": 350, "high": 389, "low": 310},
    {"time": 1387212520, "open": 283, "close": 253, "high": 289, "low": 213},
    {"time": 1387212530, "open": 162, "close": 350, "high": 189, "low": 122},
    {"time": 1387212540, "open": 452, "close": 361, "high": 542, "low": 329},
    {"time": 1387212550, "open": 173, "close": 281, "high": 312, "low": 91},
    {"time": 1387212480, "open": 183, "close": 265, "high": 271, "low": 165},
    {"time": 1387212490, "open": 395, "close": 253, "high": 424, "low": 213}
];

sample2.forEach(function(d) { d.time = new Date(d.time * 1000); });

var margin = {"top": 50, "right": 83, "bottom": 56, "left": 25, "axis": 55};
var width = 635 + margin.right + margin.left;
var height = 567 + margin.top + margin.bottom;
var timeFormat = d3.time.format("%I:%M %p %a %Y");

// set up chart
var svg = d3.select("svg").attr("width", width).attr("height", height);
var chart = d3.select("svg");

// find data range
var xMin = d3.min(sample2, function(d){ return Math.min(d.time); });
var xMax = d3.max(sample2, function(d){ return Math.max(d.time); });

var yMin = d3.min(sample2, function(d){ return Math.min(d.low); });
var yMax = d3.max(sample2, function(d){ return Math.max(d.high); });

/*

Ghetto Debugs

console.log("yMin" + " " + yMin);
console.log("yMax" + " " + yMax);

console.log("xMin" + " " + xMin);
console.log("xMax" + " " + xMax);
console.log(xMax - xMin);

*/

// scale using ranges
var xScale = d3.time.scale()
  .domain([xMin, xMax])
  .range([margin.left, width - margin.right]);

var xAxisScale = d3.time.scale()
  .domain([xMin, xMax])
  .range([margin.left, width - margin.axis]);

var yScale = d3.scale.linear()
  .domain([yMin, yMax])
  .range([height - margin.top, margin.bottom]);

// set up axes
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("right")
  .tickValues(yScale.domain());

var xAxis = d3.svg.axis()
    .scale(xAxisScale)
    .orient("bottom")
  .ticks(5)
  .tickPadding(5)
  .tickFormat(timeFormat);

// draw chart

chart.selectAll("line")
    .data(sample2)
    .enter()
    .append("svg:line")
    .attr({
      "x1": function(d,i) { return xScale(d.time) + 5; },
      "x2": function(d,i) { return xScale(d.time) + 5; },
      "y1": function(d,i) { return yScale(d.high); },
      "y2": function(d,i) { return yScale(d.low); },
      "stroke": "black"
    });

chart.selectAll("rect")
    .data(sample2)
    .enter()
    .append("svg:rect")
    .attr({
      "width": 10,
      "x": function(d,i) { return xScale(d.time); },
      "y": function(d,i) { return yScale(Math.max(d.open, d.close)); },
      "height": function(d,i) { return yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)); },
      "fill": function (d) { return d.open > d.close ? "red" : "green" },
      "stroke": "black"
    });

chart.append('g').call(yAxis)
    .attr('transform', 'translate(' + (width - margin.axis) + ', 0)');

chart.append('g').call(xAxis)
  .attr('transform', 'translate(0, ' + (height - margin.bottom) + ')');

