/**
 * Paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'myDataBase',
  tableName: 'paciente',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idPaciente'
    },

    cedula: {
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'Cedula'
    },

    sexo: {
      type: 'string',
      size: 1,
      required: true,
      columnName: 'Sexo'
    },

    nombre1: {
      type: 'string',
      required: true,
      size: 20,
      columnName: 'Nom1'
    },

    nombre2:{
      type: 'string',
      required: true,
      size: 20,
      columnName: 'Nom2'
    },

    apellido1: {
      type: 'string',
      required: true,
      size: 20,
      columnName: 'Ape1'
    },

    apellido2:{
      type: 'string',
      required: true,
      size: 20,
      columnName: 'Ape2'
    },

    fecha_nac: {
      type: 'date',
      required: true,
      columnName: 'FechaNac'
    },

    direccion: {
      type: 'string',
      size: 100,
      required: true,
      columnName: 'Direccion'
    },

    email: {
      type: 'string',
      size: 45,
      columnName: 'Email'
    },

    estado: {
      type: 'integer',
      required: true,
      columnName: 'Estado_idEstado'
    }
  }
};

