var http = require('http');
var querystring = require('querystring');
var util = require('util')
var form = require('fs').readFileSync('form.html');

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(form)
  }
  if (request.method === 'POST') {
    var postData = ''
    request.on('data', (chunk) => {
      postData += chunk;
    }).on('end', () => {
      var postDataObject = querystring.parse(postData);
      console.log('User Posted: \n ' + postData);
      response.end('You posted: \n' + util.inspect(postDataObject));
    })
  }
}).listen(4000);
