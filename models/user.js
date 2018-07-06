module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        screenname:  DataTypes.STRING,
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING
    })
};