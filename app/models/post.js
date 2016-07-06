/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    absParentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'page',
        key: 'id'
      }
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
    tableName: 'post'
  });
};
