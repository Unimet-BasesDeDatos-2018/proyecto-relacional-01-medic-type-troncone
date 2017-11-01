/**
 * Alergia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'myDataBase',
  tableName: 'alergias',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    alergia: {
      type: 'integer',
      required: true,
      size: 100,
      columnName: 'Alergias'
    },

    afectado: {
      model: 'paciente',
      columnName: 'Paciente_idPaciente'
    }

  }
};

