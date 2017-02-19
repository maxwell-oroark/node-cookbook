var http = require('http');
var fs = require('fs')
var path = require('path');
var chalk = require('chalk')

var pages = [
  { route: '', output:'woohoo' },
  { route: 'about', output: 'a simple routing exam with node cookbook'},
  { route: 'another page', output: function() {
      return `we are on this route: ${this.route}`
    }
  }
]

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css'  : 'text/css'
}

var cache = {};

function cacheAndDeliver(file, cb){
  if (!cache[file]) {
    fs.readFile(file, function(err, data) {
      if (!err) {
        cache[file] = { content: data } ;
        console.log('cache', cache[file])
      }
      cb(err, data);
    })
    return;
  }
  console.log(`loading ${file} from cache`)
  cb(null, cache[file].content)
}

http.createServer((request, response) => {
    var lookup = path.basename(decodeURI(request.url)) || 'index.html'
    console.log(lookup)
    var file = `./content/${lookup}`

    fs.exists(file, (exists) => {
      if (exists) {
        cacheAndDeliver(file, function(err, data) {
          if (err) {
            response.writeHead(500)
            response.end('Server Error')
          }
          var headers = {'Content-type' : mimeTypes[path.extname(lookup)]}
          console.log(headers)
          var stats = fs.statSync(file)
          console.log(stats)
          response.writeHead(200, headers)
          response.end(data)
        })
        return;
      }
      response.writeHead(404)
      response.end()
    })
}).listen(8080)
