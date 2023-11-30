const express = require('express');
const _ = require('underscore');

const router = express.Router();

const expenseController = require('../controllers/expense.controller');
const { validateRecord } = require('../middlewares/validation.middleware');

router.route('/test')
    .get(expenseController.test);

router.route('/records/save')
    .get(expenseController.saveToJson);

router.route('/records/notion')
    .post(
        validateRecord,
        expenseController.getRecordsFromNotion,
    );

router.route('/records/json')
    .post(
        validateRecord,
        expenseController.getRecordsFromJson,
    );


module.exports = router