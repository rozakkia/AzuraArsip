/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bill_Detail_Sub = sequelize.define('Bill_Detail_Sub', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        harga: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })

    Bill_Detail_Sub.associate = models => {
        Bill_Detail_Sub.belongsTo(models.Bill_Detail, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Bill_Detail_Sub;
};