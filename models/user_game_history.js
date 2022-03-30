'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_history.belongsTo(models.user)
    }
  }
  user_game_history.init({
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING,
    play_date: DataTypes.DATE,
    win_score: DataTypes.INTEGER,
    loss_score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_history',
  });
  return user_game_history;
};