const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = '3000';

const server = http.createServer((req, res) => {
	console.log("Request for "+req.url+' by method '+ req.method);
	if(req.method == 'GET') {
		var filelUrl;
		if(req.url == '/') filelUrl = '/index.html';
		else filelUrl = req.url;

		// get the path from the url and look in current working directory
		var filePath = path.resolve('./public'+filelUrl);
		const fileExt = path.extname(filePath);
		if(fileExt == '.html') {
			/***Using callback here***/
			fs.exists(filePath, (exists) => {
				//if resource does not exist at this filepath
				if(!exists) {
					res.statusCode = 404;
					res.setHeader('Content-Type','text/html');
					res.end('<html><body><h1>Error 404:'+fileUrl+'Not found </h1></body></html>');
					return;
				}

				res.statusCode = 200;
				res.setHeader('Content-Type','text/html');

				//createReadStream will read the file from filepath and convert into stream of bytes and pipe it to response
				fs.createReadStream(filePath).pipe(res);
			})
		} else {
			//file extension is not html, simply return with error code
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html');
			res.end('<html><body><h1>Error 404:'+filelUrl+' not an html</h1></body></html>');
			return;
		 	}
	} else {
		//request method not GET
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html');
			res.end('<html><body><h1>Error 404:'+req.method+' not supported </h1></body></html>');
			return;
		
		   }

})

	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}`);
	});