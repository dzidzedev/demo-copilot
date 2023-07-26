// create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var comments = require('./comments');

// create server
http.createServer(function (request, response) {
    // parse url
    var pathname = url.parse(request.url).pathname;

    // get path of current directory
    var realPath = path.join(__dirname, pathname);

    // get file extension
    var ext = path.extname(realPath);

    // default page
    if (pathname == '/') {
        realPath = path.join(__dirname, 'index.html');
        ext = '.html';
    }

    // if file exists, read file
    fs.exists(realPath, function (exists) {
        if (exists) {
            fs.readFile(realPath, function (err, data) {
                if (err) {
                    response.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    response.write('404, Page Not Found');

                    response.end();
                } else {
                    // set content type
                    var contentType = getContentType(ext);

                    response.writeHead(200, {
                        'Content-Type': contentType
                    });

                    response.write(data);

                    response.end();
                }
            });
        } else {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write('404, Page Not Found');

            response.end();
        }
    });
});