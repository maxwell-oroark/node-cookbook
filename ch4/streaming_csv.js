var csv = require('csv')();

process.stdin.resume();

csv.to.options({quoted:true});

csv.from.stream(process.stdin).transform(function (row) {
  return row.map(c => c.toUpperCase())
}).to.stream(process.stdout);
