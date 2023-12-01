const express = require('express');
const _ = require('underscore');

const router = express.Router();

const expenseController = require('../controllers/expense.controller');
const { validateRecord } = require('../middlewares/validation.middleware');

router.route('/test')
    .get(expenseController.test);

router.route('/save')
    .get(expenseController.saveToJson);

router.route('/notion')
    .post(
        validateRecord,
        expenseController.getRecordsFromNotion,
    );

router.route('/json')
    .post(
        validateRecord,
        expenseController.getRecordsFromJson,
    );

router.route('/pending-payment')
    .get(expenseController.pendingToPayment);

module.exports = router