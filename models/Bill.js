/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bill = sequelize.define('Bill', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        no_bill: {
            type: DataTypes.STRING,
            allowNull: false
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rekening: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jenis: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Bill.associate = models => {
        Bill.hasMany(models.Detail_Bill, {});
    }
    Bill.associate = models => {
        
        Bill.belongsTo(models.Client, {
            foreignKey: {
                allowNull: false
            }
        });
        Bill.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Bill;
};