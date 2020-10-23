/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Mail_Type = sequelize.define('Mail_Type', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        format_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file_template: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jenis: {
            type: DataTypes.STRING,
            allowNull: false
        }   
    })
    Mail_Type.associate = models => {
        Mail_Type.hasMany(models.Mail,{})
    }
    Mail_Type.associate = models => {
        Mail_Type.belongsTo(models.Service, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Mail_Type;
};