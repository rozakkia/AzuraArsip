/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bill_Detail = sequelize.define('Bill_Detail', {
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    Bill_Detail.associate = models => {
        Bill_Detail.hasMany(models.Bill_Detail_Sub, {});
    }
    Bill_Detail.associate = models => {
        
        Bill_Detail.belongsTo(models.Bill, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Bill_Detail;
};