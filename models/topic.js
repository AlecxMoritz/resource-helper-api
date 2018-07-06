module.exports = function(sequelize, DataTypes) {
    return sequelize.define('topic', {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        owner_uid: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    })
};