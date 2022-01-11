'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserAuth }) {
      // define association here
      this.hasMany(UserAuth, { foreignKey: 'role_id' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Role.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      role: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'Role',
    }
  );
  return Role;
};
