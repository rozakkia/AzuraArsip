/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Client = sequelize.define('Client', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pj_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pj_jabatan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alamat: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })

    Client.associate = models => {
        Client.hasMany(models.Client_Contact, {});
    }

    return Client;
};