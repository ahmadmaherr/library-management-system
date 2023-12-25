import DataType from 'sequelize';
import Model from '../sequelize.js';

const Author = Model.define('Author', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  
  name: {
    type: DataType.STRING,
    allowNull: false
  },

  createdAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false
  },
  
  updatedAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false
  },

});

export default Author;