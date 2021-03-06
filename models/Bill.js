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
            allowNull: true
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        keterangan_store: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        tgl_dikirim: {
            type: DataTypes.DATE,
            allowNull: true
        },
        stat: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    
    Bill.associate = models => {
        Bill.hasMany(models.Bill_Detail);
        Bill.belongsTo(models.Bank_Account, {
            foreignKey: {
                allowNull: true
            }
        });
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
        Bill.belongsTo(models.Type, {
            foreignKey:  {
                allowNull: false
            }
        });
    }

    return Bill;
};