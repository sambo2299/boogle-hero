const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join( __dirname,'../', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const server = {
    start : start = () => {
        const routes = require('./routes');
        const httpServer = http.createServer(app);
        httpServer.listen(4999, 'localhost');
        routes(app);
    }
}

server.start();

