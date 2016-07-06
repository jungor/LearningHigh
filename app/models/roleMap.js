/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roleMap', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    tableName: 'roleMap'
  });
};
