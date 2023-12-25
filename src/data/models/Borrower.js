import DataType from 'sequelize';
import Model from '../sequelize.js';
import bcrypt from 'bcrypt';

const Borrower = Model.define('Borrower', {

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

  password: {
    type: DataType.STRING,
    allowNull: false
  },

  email: {
    type: DataType.STRING,
    allowNull: false
  },

  registrationDate: {
    type: "TIMESTAMP",
    defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
    allowNull: true
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

Borrower.prototype.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

export default Borrower;