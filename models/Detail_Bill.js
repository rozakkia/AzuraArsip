/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Detail_Bill = sequelize.define('Detail_Bill', {
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        harga: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Detail_Bill.associate = models => {
        Detail_Bill.belongsTo(models.Bill, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Detail_Bill;
};