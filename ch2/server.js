var http = require('http');
var querystring = require('querystring');
var util = require('util')
var form = require('fs').readFileSync('form.html');
var connect = require('connect');
var bodyParser = require('body-parser');
var getRawBody = require('raw-body');

connect().use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)
    req.text = string
    next()
  })
})

connect(bodyParser(), (request, response) => {
  if (request.method === 'POST') {
    console.log(`user posted \n ${request.body}`)
    response.end(`user posted \n ${request.body}`)
  }
  if (request.method === 'GET') {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.end(form)
  }
}).listen(4000)

// http.createServer((request, response) => {
//   if (request.method === 'GET') {
//     response.writeHead(200, {'Content-Type': 'text/html'})
//     response.end(form)
//   }
// }).listen(4000);
