/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
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
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })

    User.associate = models => {
        User.hasMany(models.Bill, {});
    }
    User.associate = models => {
        User.belongsTo(models.Role, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return User;
};