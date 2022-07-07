import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number; // exclamação pra dizer q o atributo é obrigatório

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Users',
  tableName: 'users',
});

export default User;
