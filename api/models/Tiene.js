/**
 * Tiene.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'myDataBase',
  tableName: 'tiene',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    idPaciente: {
      model: 'paciente',
      columnName: 'Paciente_idPaciente'
    },

    idMedico: {
      model: 'medico',
      columnName: 'Medico_idMedico'
    },

    idHistoria: {
      model: 'historia',
      columnName: 'Historia_idHistoria'
    }
  }
};

