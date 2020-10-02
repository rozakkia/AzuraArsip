/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Template = sequelize.define('Template', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jenis: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    Template.associate = models => {
        Template.hasMany(models.Mail, {});
    }

    return Template;
};