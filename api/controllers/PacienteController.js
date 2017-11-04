/**
 * PacienteController
 *
 * @description :: Server-side logic for managing Pacientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  show: function (req, res) {
    Paciente.findOne(req.param('id')).exec(function (err, paciente) {
      Alergia.find({afectado: req.param('id')}).exec(function (err, alergia) {
        Telefono.find({persona: req.param('id')}).exec(function (err, telefono) {
          Tiene.find({paciente: req.param('id')}).exec(function(err, tiene) {
            Historia.find({id: tiene[0].historia}).exec(function (err, historia) {
              res.view({
                paciente: paciente,
                alergias: alergia,
                telefonos: telefono,
                historias: historia
              });
            });
          });
        });
      });
    });
  },


  delete: function (req, res) {

  var historiasABorrar = Tiene.query('select Historia_idHistoria from tiene where Paciente_idPaciente = ' + req.param('id'),
    function (err, historia) {
      historiasABorrar = JSON.parse(JSON.stringify(historia));
      sails.controllers.alergia.delete(req, res);
      sails.controllers.telefono.delete(req, res);
      sails.controllers.describe.delete(historiasABorrar, res);
      sails.controllers.tiene.delete(req, res);
      sails.controllers.historia.delete(historiasABorrar, res);
      Paciente.destroy(req.param('id')).exec(function (err) {
        if (err) {
          sails.log(err)
        }
        res.redirect('back');
      });

    });
  },
};

