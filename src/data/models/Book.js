import DataType from 'sequelize';
import Model from '../sequelize.js';

const Book = Model.define('Book', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  
  title: {
    type: DataType.STRING,
    allowNull: false
  },

  ISBN: {
    type:  DataType.STRING(17),
    defaultValue: true,
    allowNull: false
  },

  availableQuantity: {
    type: DataType.INTEGER,
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

export default Book;