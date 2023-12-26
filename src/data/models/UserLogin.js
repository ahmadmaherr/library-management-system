import DataType from 'sequelize';
import Model from '../sequelize.js';

const UserLogin = Model.define('UserLogin', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  token: { // auth token
    type: DataType.TEXT
  },

  userId: {
    type: DataType.UUID
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

export default UserLogin;
