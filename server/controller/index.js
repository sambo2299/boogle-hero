const express = require('express');
const cors = require('cors');
const router = express.Router();

const AppController = require('./app.controller');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



router.get('/getLetters',cors(corsOptions), AppController.getLetters);
router.post('/getScore',cors(corsOptions), AppController.getScore);
router.get('/checkword',cors(corsOptions), AppController.checkword);

module.exports = router;