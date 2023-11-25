const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');

const notionRouter = require('./src/routes/notion.router');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/notion', notionRouter);


let server = app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}`);
})

module.exports = {
    app,
    server
}