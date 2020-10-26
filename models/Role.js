/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nama_role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        routing: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        deletedAt: 'deletedAT',
        paranoid: true
    })
    
    Role.associate = models => {
        Role.hasMany(models.User, {});
    }

    return Role;
};