const fs = require('fs');
const path = require('path');
const http = require('http');
const urlParser = require('url');

const port = process.env.PORT || 8080;
const base = process.env.BASE_URL || '/src';

http.createServer((request, response) => {
  try {
    const requestUrl = urlParser.parse(request.url);
    const urlPath = (requestUrl.pathname === '/') ? '/index.html' : path.normalize(requestUrl.pathname);
    const fsPath = `${__dirname}${base}${urlPath}`;
    const fileStream = fs.createReadStream(fsPath);

    fileStream.pipe(response);

    fileStream.on('open', () => {
      response.writeHead(200);
    });

    fileStream.on('error', () => {
      response.writeHead(404);
      response.end();
    });
  } catch (error) {
    response.writeHead(500);
    response.end();
    // eslint-disable-next-line no-console
    console.log(error);
  }
}).listen(port);

// eslint-disable-next-line no-console
console.log(`Ready! Open http://localhost:${port}`);
