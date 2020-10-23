/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bill_Detail_Sub = sequelize.define('Bill_Detail_Sub', {
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        harga: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
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