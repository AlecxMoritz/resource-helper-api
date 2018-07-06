const Sequelize = require('sequelize');
var Users = require('./models/user');
var Topics = require('./models/topic');
var Resources = require('./models/resource');

const sequelize = new Sequelize('process.env.DATABASE_URL', 'postgres', 'ghastb0i', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log("Connected to DB. Happy hacking ;)");
    },

    function(err) {
        console.log("an exception occured: ", err )
    }
)

module.exports = sequelize;