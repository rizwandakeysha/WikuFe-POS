'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_menu",
        as: "detail_transaksi"
        })
    }
  }
  menu.init({
    id_menu: {
      type:DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    nama_menu: DataTypes.STRING(100),
    jenis: DataTypes.ENUM('makanan', 'minuman'),
    deskripsi: DataTypes.TEXT,
    gambar: DataTypes.STRING(255),
    harga: DataTypes.INTEGER(11)
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu'
  });
  return menu;
};