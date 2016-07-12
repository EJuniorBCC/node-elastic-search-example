var express = require('express');
var router = express.Router();
var controller = require('./controllers/document');

router.post('/document',controller.create);
router.get('/document/:query',controller.search)

module.exports = router;