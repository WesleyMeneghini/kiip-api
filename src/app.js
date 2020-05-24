const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// conecxao com o banco de dados em cloud
mongoose.connect(
    config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false,
    }
);


// Carregar as models
const Service = require('./models/service');


// Carregar rotas
const servicesRoute = require('./routes/services-route');
app.use('/services', servicesRoute);


module.exports = app;

