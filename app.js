const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const expenseRouter = require('./src/routes/expense.router');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/expense', expenseRouter);

let server = app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}`);
})

module.exports = {
    app,
    server
}