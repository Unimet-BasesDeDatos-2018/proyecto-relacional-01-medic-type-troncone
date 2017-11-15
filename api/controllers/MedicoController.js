/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mostrarPacientes: function (req, res) {
    var licencia = req.param('licencia');
    Medico.find({Licencia: licencia}).exec( function(err, medico) {
        var query = Paciente.query('SELECT * FROM paciente '+
                               'INNER JOIN tiene ON tiene.Paciente_idPaciente = paciente.idPaciente '
                               + 'INNER JOIN medico ON  tiene.Medico_idMedico = medico.idMedico '+
                               ' where medico.Licencia = ' + licencia + ';', function(err, paciente) {
          var aux = JSON.parse(JSON.stringify(paciente));
          res.view({
            paciente: aux,
            medico: medico
          })
        })
      }
    );
  },

  topMedicos: function(req, res){
    var query = Medico.query('Select CONCAT(medico.Nombre, " ", medico.Apellido) AS NombreCompleto, '+
     'especialidad.Especialidad, COUNT(Consulta.Medico_idMedico) As Consultas From Medico '+
      'INNER JOIN consulta on medico.idMedico = consulta.Medico_idMedico ' +
      'INNER JOIN especialidades ON medico.idMedico = especialidades.Medico_idMedico ' +
      'INNER JOIN especialidad ON especialidades.Especialidad_idEspecialidad = especialidad.idEspecialidad ' +
      'GROUP BY consulta.Medico_idMedico '+
      'ORDER BY Consultas;', function(err, result){
        res.view({
          matriz : result,
        });
      });

  },

  listaMedicos: function(req, res){
    var idEspec = req.param('idEspecialidad');
    sails.log(idEspec);
    if(idEspec == 0){
    var query = Medico.query('Select medico.*, especialidad.Especialidad from Medico '+
      'INNER JOIN especialidades ON medico.idMedico = especialidades.Medico_idMedico '+
      'INNER JOIN especialidad ON especialidades.Especialidad_idEspecialidad = especialidad.idEspecialidad;', function(err, result){
       if(err) sails.log(err);
       sails.log(result);
        res.view({
          matriz: result,
          tipo: "todos los campos",
        });
      });
  }else{
    var idEspec = req.param('idEspecialidad');
    var query = Medico.query('Select medico.*, especialidad.Especialidad from Medico '+
      'INNER JOIN especialidades ON medico.idMedico = especialidades.Medico_idMedico '+
      'INNER JOIN especialidad ON especialidades.Especialidad_idEspecialidad = especialidad.idEspecialidad '+
      'WHERE especialidad.idEspecialidad = '+idEspec+';', function(err, result){
       if(err) sails.log(err);
       sails.log(result);
        res.view({
          matriz: result,
          tipo: result[0].Especialidad,
        });
      });
    }
  },

  solicitudConsulta: function(req, res){


  },

};

