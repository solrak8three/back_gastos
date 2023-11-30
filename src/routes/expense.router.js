const express = require('express');
const _ = require('underscore');

const router = express.Router();

const expenseController = require('../controllers/expense.controller');
const { validateRecord } = require('../middlewares/validation.middleware');

router.route('/test')
    .get(expenseController.test);

router.route('/records')
    .post(
        validateRecord,
        expenseController.getRecords,
    );


module.exports = router