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
        isi: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        jenis: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    Template.associate = models => {
        Template.hasMany(models.Type);
    }

    return Template;
};