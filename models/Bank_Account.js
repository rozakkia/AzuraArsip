/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bank_Account = sequelize.define('Bank_Account', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_num: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    Bank_Account.associate = models => {
        Bank_Account.hasMany(models.Bill, {});
        Bank_Account.belongsTo(models.Client, {
            foreignKey: {
                allowNull: true
            }
        });
    }

    return Bank_Account;
};