/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Mail = sequelize.define('Mail', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        no_mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        perihal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tujuan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isi: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        jenis: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stat: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    
    Mail.associate = models => {
        Mail.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Mail.belongsTo(models.Type, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Mail;
};