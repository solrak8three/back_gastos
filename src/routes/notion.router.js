const express = require('express');
const _ = require('underscore');

const router = express.Router();

const notionController = require('../controllers/notion.controller');

router.route('/records')
    .post(notionController.getRecords);


module.exports = router