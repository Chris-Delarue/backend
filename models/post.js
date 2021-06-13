'use strict';

const {Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.users,{
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  post.init({
    idusers: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};