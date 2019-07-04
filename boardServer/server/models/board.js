'use strict';
module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});

  board.associate = function(models) {
    board.hasMany(models.comment, {
      foreignKey: 'bid',
      as: 'comments',
    });
  };
  return board;
};