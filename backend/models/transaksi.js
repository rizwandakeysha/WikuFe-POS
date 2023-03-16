'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user"
      })
      this.belongsTo(models.meja, {
        foreignKey: "id_meja",
        as: "meja"
      })
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
        })
    }
  }
  transaksi.init({
    id_transaksi: {
      type:DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    tgl_transaksi: DataTypes.DATE,
    id_user: DataTypes.INTEGER(11),
    id_meja: DataTypes.INTEGER(11),
    nama_pelanggan: DataTypes.STRING(100),
    status: DataTypes.ENUM('belum_bayar', 'lunas'),
    total: DataTypes.INTEGER(11)
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};