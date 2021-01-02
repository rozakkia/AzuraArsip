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
            allowNull: true
        },
        perihal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tujuan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isi: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        keytag: {
            type: DataTypes.STRING,
            allowNull: true
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
                allowNull: true
            }
        });
        Mail.belongsTo(models.Type, {
            foreignKey: {
                allowNull: true
            }
        });
    }

    return Mail;
};