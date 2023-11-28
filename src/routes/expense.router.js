const express = require('express');
const _ = require('underscore');

const router = express.Router();

const expenseController = require('../controllers/expense.controller');

router.route('/test')
    .get(expenseController.test);

router.route('/records')
    .post(expenseController.getRecords);

router.route('/records/without-fixes')
    .post(expenseController.getRecordsWithoutFixes);


module.exports = router