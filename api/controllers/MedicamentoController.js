/**
 * AlergiaController
 *
 * @description :: Server-side logic for managing Alergias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  show: function(req, res) {
    Medicamento.find().exec(function(err, medicamentos){
      if (err) sails.log(err);
      res.view({
        medicamento: medicamentos
      })
    });
  },

  nuevo: function(req, res){
    res.view();
  },

  'new': function(req, res) {
    Medicamento.create({
      nombreComercial: req.param('nombreComercial'),
      efectosSec: req.param('efectosSec'),
      contraindicaciones: req.param('contraindicaciones')
    }).exec(function(err, medicamento){
      if (err) sails.log(err);
      res.redirect('back');
    });
  }

};
