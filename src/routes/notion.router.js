const express = require('express');
const _ = require('underscore');

const router = express.Router();

const notionController = require('../controllers/notion.controller');

router.route('/records')
    .get(notionController.getRecords);


router.route('/records')
    .post(notionController.getRecordsFilteredByDateRage);


router.route('/records/calculate')
    .get(notionController.getRecordsCalculate);


router.route('/records/calculate')
    .post(notionController.getRecordsFilteredByDateRageCalculate);


module.exports = router