/**
 * HistoriaController
 *
 * @description :: Server-side logic for managing Historias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  delete: function(req, res) {
    var object = req[0];
    _.forEach(object, Historia.destroy({id: object.Historia_idHistoria}, function(err){
      if (err) sails.log(err);
      return;
    }));
  },


};

