/**
 * PacienteController
 *
 * @description :: Server-side logic for managing Pacientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  nuevo: function(req, res) {
    Medico.findOne(req.param('id')).exec( function(err, medico) {
      res.view({
        medico: medico
      })
    });
  },

  nuevoPaciente: function(req, res) {
    Paciente.create({
      cedula: req.param('cedula'),
      nombre1: req.param('nombre1'),
      apellido1: req.param('apellido1'),
      nombre2: req.param('nombre2'),
      apellido2: req.param('apellido2'),
      edo_civil: req.param('edo_civil'),
      direccion: req.param('direccion'),
      nivel_educativo: req.param('nivel_educativo'),
      fecha_nac: req.param('fecha_nac'),
      sexo: req.param('sexo'),
      email: req.param('email'),
      estado: req.param('estado')
    }).exec( function (err, paciente){
      if (err || !paciente ) {
        return;
      }
    });
    res.redirect('/');
  },

  'new': function(req, res) {
    TipoSangre.find({tiposangre: req.param('TipoSangre')}).exec(function(err, tipo){
      if (err || !tipo) {
        sails.log(err);
        res.redirect('505');
      }
      else {
        Estado.query("SELECT * FROM estado where Estado like '%"+req.param('estado')+"%'", function(err, estado){
          if (err || !estado) {
            sails.log(err);
            res.redirect('505');
          }
          else {
            Paciente.find({cedula: req.param('cedula')}).exec(function(err, paciente){
              if (JSON.stringify(paciente).length > 2) {
                res.redirect('back');
              }
              else {
                Paciente.create({
                  cedula: req.param('cedula'),
                  nombre1: req.param('nombre1'),
                  nombre2: req.param('nombre2'),
                  apellido1: req.param('apellido1'),
                  apellido2: req.param('apellido2'),
                  sexo: req.param('sexo'),
                  fecha_nac: req.param('fecha_nac'),
                  direccion: req.param('direccion'),
                  email: req.param('email'),
                  estado: estado[0].idEstado,
                  tiposangre: tipo[0].id
                }).exec(function(err, paciente){
                  if (err) sails.log(err);
                  Historia.create({
                    fechaHist: '1901-01-01',
                    sintomas: 'Sin definir',
                    notas: 'Sin definir',
                    peso: 0,
                    estatura: 0,
                    diagnostico: 'Sin definir'
                  }).exec( function(err, historia) {
                    if (err) sails.log(err);
                    Tiene.create({
                      paciente: paciente.id,
                      medico: req.param('medico'),
                      historia: historia.id
                    }).exec( function (err, historia) {
                      if (err) sails.log(err);
                      Medico.findOne(req.param('medico')).exec( function(err, medico) {
                        if (err) sails.log(err);
                        res.redirect('back');
                      });
                    });
                  });
                });
              }
            });
          }
        });
      }
    });
  },

  crear: function(req, res) {
    Paciente.create(req.params.all(), function(err, paciente) {
      if (err) sails.log(err);
      res.redirect('back');
    });
  },

  show: function (req, res) {
    var pacientes;
    var medicos;
    for (var i = 0 ; i < req.param('id').length ; i++ ) {
      if (req.param('id').substring(i,i+1) == "+") {
        pacientes = req.param('id').substring(0, i);
        medicos = req.param('id').substring(i+1);
      }
    }
    Paciente.findOne({id: pacientes}).exec(function (err, paciente) {
      Alergia.find({afectado: pacientes}).exec(function (err, alergia) {
        Telefono.find({persona: pacientes}).exec(function (err, telefono) {
          Medico.findOne({id: medicos}).exec(function(err, medico) {
            Tiene.find({paciente: pacientes}).exec(function (err, tiene) {
              TipoSangre.find({id: paciente.tiposangre}).exec(function(err, tiposangre){
                Estado.find({id: paciente.estado}).exec(function(err, estado){
                  estado = JSON.parse(JSON.stringify(estado));
                  var aux = '';
                  if (tiene) {
                    for (var i = 0 ; i < tiene.length ; i++ ) {
                      if ( i == tiene.length - 1 ) {
                        aux += ('idHistoria = '+tiene[i].historia);
                      }
                      else {
                        aux += ('idHistoria = '+tiene[i].historia+' or ');
                      }
                    }
                    var aux2 = Historia.query('select * from historia where '+aux, function(err, result){
                      if (!result) {
                        res.redirect('/');
                        return;
                      }
                      aux2 = JSON.parse(JSON.stringify(result));
                      aux2 = aux2;
                      res.view({
                        tiposangre: tiposangre[0],
                        paciente: paciente,
                        alergias: alergia,
                        telefonos: telefono,
                        medico: medico,
                        estado: estado[0],
                        historias: aux2
                      });
                    })
                  }
                  else {
                    res.view({
                      paciente: paciente,
                      alergias: alergia,
                      telefonos: telefono,
                      medico: medico,
                      tiposangre: tiposangre[0],
                      estado: estado[0],
                      historias: null
                    });
                  }
                });
              });
            });
          });
        });
      });
    });
  },

  showPaciente: function (req, res) {
    var pacientes = req.param('cedula');
    Paciente.findOne({cedula: pacientes}).exec(function (err, paciente) {
      Alergia.find({afectado: pacientes}).exec(function (err, alergia) {
        Telefono.find({persona: pacientes}).exec(function (err, telefono) {
            Tiene.find({paciente: pacientes}).exec(function (err, tiene) {
              var aux = '';
              if (tiene) {
              for (var i = 0 ; i < tiene.length ; i++ ) {
                if ( i == tiene.length - 1 ) {
                  aux += ('idHistoria = '+tiene[i].historia);
                }
                else {
                  aux += ('idHistoria = '+tiene[i].historia+' or ');
                }
              }
              var aux2 = Historia.query('select * from historia where '+aux, function(err, result){
                if (!result) {
                  res.view({
                  paciente: paciente,
                  alergias: alergia,
                  telefonos: telefono,
                  historias: null
                });
                  return;
                }
                aux2 = JSON.parse(JSON.stringify(result));
                aux2 = aux2;
                res.view({
                  paciente: paciente,
                  alergias: alergia,
                  telefonos: telefono,
                  historias: aux2
                });
              })
              }
              else {
                res.view({
                  paciente: paciente,
                  alergias: alergia,
                  telefonos: telefono,
                  historias: null
                });
              }
            });
          });
        });
      });
  },


  delete: function (req, res) {

  var historiasABorrar = Tiene.query('select Historia_idHistoria from tiene where Paciente_idPaciente = ' + req.param('id'),
    function (err, historia) {
      historiasABorrar = JSON.parse(JSON.stringify(historia));
      sails.controllers.describe.delete(historiasABorrar, res);
      sails.controllers.alergia.delete(req, res);
      sails.controllers.telefono.delete(req, res);
      sails.controllers.tiene.delete(req, res);
      sails.controllers.historia.delete(historiasABorrar, res);
      Paciente.destroy(req.param('id')).exec(function (err) {
        if (err) {
          sails.log(err)
        }
      });
      res.redirect('back');
    });
  },

  editar: function(req, res) {
    Paciente.findOne(req.param('id')).exec(function(err, paciente){
      res.view({
        paciente: paciente
      })
    });
  },

  refrescar: function(req, res) {
    Paciente.update(req.param('id'), req.params.all(), function(err){
      if (err) sails.log(err);
      res.redirect('back');
    });
  }

};

