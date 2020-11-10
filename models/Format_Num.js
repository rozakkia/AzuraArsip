/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Format_Num = sequelize.define('Format_Num', {
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
        format_num: {
            type: DataTypes.STRING,
            allowNull: false
        }   
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    Format_Num.associate = models => {
        Format_Num.hasMany(models.Type,{})
    }

    return Format_Num;
};