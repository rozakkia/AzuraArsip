/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Client_Contact = sequelize.define('Client_Contact', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jenis_kontak: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detail_kontak: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })

    Client_Contact.associate = models => {
        Client_Contact.belongsTo(models.Client, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Client_Contact;
};