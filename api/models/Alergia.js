/**
 * Alergia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'myDataBase',
  tableName: 'alergias',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idAlergias'
    },

    alergia: {
      type: 'string',
      size: 45,
      required: true,
      unique: true,
      columnName: 'Alergia'
    }

  }
};

