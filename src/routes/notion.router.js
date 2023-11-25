const express = require('express');
const _ = require('underscore');

const notionRouter = express.Router();

const notionController = require('../controllers/notion.controller');

notionRouter.get('/records', (req, res) => {
    return notionController
        .getRecords()
        .then(notionRecords => {
            console.log('Recupera los registros de Notion!!');
            res.status(200).json(notionRecords);
        })
})

notionRouter.post('/records', (req, res) => {
    const { startDate, endDate } = req.body;
    return notionController
        .getRecordsFilteredByDateRage(startDate, endDate)
        .then(notionRecords => {
            res.status(200).json(notionRecords);
        })
})

notionRouter.get('/records/calculate', (req, res) => {
    return notionController
        .getRecordsCalculate()
        .then(price => {
            res.status(200).json(price);
        })
})

notionRouter.post('/records/calculate', (req, res) => {
    const { startDate, endDate } = req.body;
    return notionController
        .getRecordsFilteredByDateRageCalculate(startDate, endDate)
        .then(notionRecords => {
            res.status(200).json(notionRecords);
        })
})


module.exports = notionRouter