require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var user = require('./controllers/userController');
var topic = require('./controllers/topicController');
var resource = require('./controllers/resourceController');
var bodyParser = require('body-parser');

sequelize.sync();

app.use(express.static('public'));
app.use(bodyParser.json())

app.use(require('./middleware/headers'))
app.use('/user', user)

app.use(require('./middleware/validate-session'))
app.use('/topic', topic)
app.use('/resource', resource)

app.listen(process.env.PORT, function() {
    console.log("App is spinning on ", process.env.PORT)
})