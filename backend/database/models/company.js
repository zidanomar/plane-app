'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Plane, User }) {
      // define association here
      this.hasMany(Plane, { foreignKey: 'company_id', as: 'planes' });
      this.hasMany(User, { foreignKey: 'company_id', as: 'users' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Company.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User can not be null' },
          notEmpty: { msg: 'User can not be empty' },
        },
      },
      imgUrl: {
        type: DataTypes.STRING(1234),
        defaultValue:
          'https://banner2.cleanpng.com/20180817/cef/kisspng-garuda-indonesia-airplane-airline-logo-5b767867bc17e2.7600617315344907277704.jpg',
      },
    },
    {
      sequelize,
      tableName: 'companies',
      modelName: 'Company',
    }
  );
  return Company;
};
