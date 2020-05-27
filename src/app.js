const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const config = require('./config');

app.use(cors())
app.use('/files', express.static('uploads'))

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
const Scheduling = require('./models/scheduling');


// Carregar rotas
const servicesRoute = require('./routes/services-route');
const schedulingRoute = require('./routes/scheduling-route');
app.use('/services', servicesRoute);
app.use('/scheduling', schedulingRoute);


module.exports = app;

