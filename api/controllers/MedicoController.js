/**
 * MedicoController
 *
 * @description :: Server-side logic for managing Medicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mostrarPacientes: function (req, res) {
    var licencia = req.param('licencia');
    var pacientes = "";
    var historias = "";
    Medico.find({
      licencia: licencia
    }).exec(function(err, medico){
      if (err) sails.log(err);
      if (medico) {
        Tiene.find({
          medico: medico[0].id
        }).exec(function(err, tiene){
          var aux;
          var aux2;
          var count = 0;
          if (err) sails.log(err);
          if (tiene) {
            for (var i = 0 ; i < tiene.length ; i++ ) {
              aux2 = JSON.stringify(tiene[i].historia);
              aux2 += ",";
              historias = aux2.concat(historias);
              Paciente.findOne(tiene[i].paciente).exec(function (err, paciente) {
                aux = JSON.stringify(paciente.id);
                count++;
                aux += ",";
                pacientes = aux.concat(pacientes);
                if ( count > tiene.length - 1) {
                  Paciente.query("select * from paciente where idPaciente in ("+pacientes+"0)", function(err, respuestPac){
                    if (err) sails.log(err);
                    res.view({
                      paciente: JSON.parse(JSON.stringify(respuestPac)),
                      medico: medico
                    })
                  });
                }
              });
            }
          }
          else {
            res.redirect('404');
          }
        });
      }
      else {
        res.redirect('404');
      }
    });

  },

};

