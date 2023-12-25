import Sequelize from 'sequelize';
import { databaseConfig } from '../../config.js';
const Op = Sequelize.Op;

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password, {
    pool: {
      min: databaseConfig.minPool,
      max: databaseConfig.maxPool,
    },
    dialect: 'mysql',
    host: databaseConfig.host,
    logging: false,
    define: {
      freezeTableName: true
    },
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $and: Op.and,
      $or: Op.or,
    }
  });


export default sequelize;
