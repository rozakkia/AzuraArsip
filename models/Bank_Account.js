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
    })
    
    Bank_Account.associate = models => {
        Bank_Account.hasMany(models.Bill, {});
    }

    return Bank_Account;
};