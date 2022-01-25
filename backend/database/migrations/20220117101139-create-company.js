'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING(1234),
        defaultValue:
          'https://png2.cleanpng.com/sh/c196181b4b7358b8ca3111d98fe652ac/L0KzQYm3VcAzN5V5j5H0aYP2gLBuTfdzaaoyj9H1Zj3vf7j2TfdzaaFtgdU2ZHX2ebj1TgdwdJcyhNHwbz24cbaCVBExP5ZoTKQ9Nj63QIO3V8QyPGI6Sqc7NUC4RoiCVsc4NqFzf3==/kisspng-gray-wolf-logo-graphic-design-wolf-logo-5ae97a07ec4246.4020741415252505679677.png',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('companies');
  },
};
