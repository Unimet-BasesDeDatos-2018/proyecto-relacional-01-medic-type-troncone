/**
 * AlergiaController
 *
 * @description :: Server-side logic for managing Alergias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res) {
    Alergia.find({afectado: req.param('id')}).exec(function (err, alergia) {
      res.view({
        alergia: alergia[0]
      });
    });
  },

  index: function(req, res) {
    Alergia.find({afectado: req.param('id')}).exec( function (err, paciente) {
      if (err) sails.log(err);
      return paciente;
    });
  },

  delete: function(req, res) {
    Alergia.destroy({afectado: req.param('id')}).exec(function (err) {
      if (err) sails.log(err);
      return;
    });
  },

  bye: function(req, res) {
    Alergia.destroy({
      afectado: req.param('id').substring(0,1),
      alergia: req.param('id').substring(2)
    }).exec(function(err){
      if (err) sails.log(err);
    });
    res.redirect('back');
  },

};

