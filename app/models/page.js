/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    coursewareId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'page'
  });
};
