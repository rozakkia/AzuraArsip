
'user strict';

const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        id_user: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    })
    return Users;
}