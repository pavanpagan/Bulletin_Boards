'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.board, {
      foreignKey: 'bid',
      onDelete: 'CASCADE',
    });
  };
  return comment;
};