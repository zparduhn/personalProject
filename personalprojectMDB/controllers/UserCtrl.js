var User = require("../schemas/userModel.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

module.exports = {
  create: function(req, res, next) {
    var user = new User(req.body);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        user.save(function(err, s) {
          if (err) {
            return res.status(500).send(err);
          } else {
            return err ? res.status(500).send(err) : res.send(s);
          }
        });
      });
    })
  },
  index: function(req, res, next) {
    User.find(req.query, function(err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  },
  // show: function(req, res, next){
  //   User.find(req.body.email, function(err, response){
  //     User.comparePassword = function(password, done) {
  //     bcrypt.compare(password, this.password, function(err, isMatch) {
  //       done(err, isMatch);
  //     });
  //   })
  //
  // },


  // show: function(req, res, next) {
  //   User
  //   //console.log(req.params.user_id);
  //   .findById(req.params.user_id)
  //   .populate('cart.item')
  //   .exec()
  //   .then(function(results){
  //     res.status(200).json(results);
  //   }, function(err){
  //     res.status(500).send(err);
  //   })

  // User.findById(req.params.user_id).exec(function(err, response){
  //   //console.log(response)
  //   if(err) {
  //     res.status(500).json(err);
  //   } else {
  //     res.json(response);
  //   }
  // });
  //},

};
