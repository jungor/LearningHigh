/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    coursewareId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'courseware',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'page'
  });
};
