module.exports = function(sequelize, DataTypes) {
    return sequelize.define('resource', {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        topic_uid: DataTypes.INTEGER,
        owner_uid: DataTypes.INTEGER,
        topic_title: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        link: DataTypes.STRING,
    })
};