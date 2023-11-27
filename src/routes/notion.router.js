const express = require('express');
const _ = require('underscore');

const router = express.Router();

const notionController = require('../controllers/notion.controller');

router.route('/records')
    .post(notionController.getRecords);

router.route('/records/without-fixes')
    .post(notionController.getRecordsWithoutFixes);


module.exports = router