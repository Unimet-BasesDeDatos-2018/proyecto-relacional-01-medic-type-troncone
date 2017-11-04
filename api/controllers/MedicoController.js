/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mostrarPacientes: function (req, res) {
    Medico.find().where({'licencia':req.param('id')})
      .exec( function(err, medico) {
        var query = Paciente.query('select * from paciente\n' +
          'inner join (select Paciente_idPaciente from tiene\n' +
          'inner join medico on medico.idMedico = tiene.Medico_idMedico and medico.idMedico = '+medico[0].id+') as hola\n' +
          'on paciente.idPaciente = hola.Paciente_idPaciente', function(err, paciente) {
          var aux = JSON.parse(JSON.stringify(paciente));
          res.view({
            paciente: aux
          })
        })
      }
    );
  },

};

