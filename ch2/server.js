var http = require('http');
var querystring = require('querystring');
var util = require('util')
var form = require('fs').readFileSync('form.html');

var maxData = 2 * 1024 * 1024; // 2mb

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(form)
  }
  if (request.method === 'POST') {
    var postData = ''
    request.on('data', function(chunk) {
      postData += chunk;
      if (postData.length > maxData) {
        postData = '';
        this.pause();
        response.writeHead(413); // request entity too large
        response.end('Too large')
      }
    }).on('end', () => {
      if (!postData) {
        console.log('no data submitted...')
        response.end();
        return;
      }
      var postDataObject = querystring.parse(postData);
      console.log('User Posted: \n ' + postData);
      response.end('You posted: \n' + util.inspect(postDataObject));
    })
  }
}).listen(4000);
