import DataType from 'sequelize';
import Model from '../sequelize.js';

const Borrow = Model.define('Borrow', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  
  bookId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  borrowerId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  isReturned: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  borrowDate: {
    type: "TIMESTAMP",
    defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },

  returnDate: {
    type: "TIMESTAMP",
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

export default Borrow;