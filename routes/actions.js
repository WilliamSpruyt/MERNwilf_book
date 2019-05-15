// action.route.js

const express = require('express');
const actionRoutes = express.Router();

// Require Action model in our routes module
let Action = require('../models/user');

//load account
actionRoutes.get("/:user", (req, res) => {
    
   Action.find({ email: req.params.user }).exec((err, mono) => {
      if (err) {
        return res.json({ success: false, message: "Some Error" });
      }
      if (mono.length) {
        return res.json({
          success: true,
          message: "Message fetched by id successfully",
          act:mono
        });
      } else {
        return res.json({
          success: false,
          message: "Message with the given id not found"
        });
      }
    });
  });
  actionRoutes.get("/friends/:user", (req, res) => {
    
    Action.find({ name: req.params.user }).exec((err, mono) => {
       if (err) {
         return res.json({ success: false, message: "Some Error" });
       }
       if (mono.length) {
         return res.json({
           success: true,
           message: "Message fetched by id successfully",
           act:mono
         });
       } else {
         return res.json({
           success: false,
           message: "Message with the given id not found"
         });
       }
     });
   });
// Defined store route
actionRoutes.route('/add').post(function (req, res) {
  let action = new Action(req.body);
  action.save()
    .then(action => {
      res.status(200).json({'action': 'action in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
actionRoutes.route('/').get(function (req, res) {
    Action.find(function(err, actiones){
    if(err){
      console.log(err);
    }
    else {
      res.json(actiones);
    }
  });
});

// Defined edit route
actionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Action.findById(id, function (err, action){
      res.json(action);
  });
});

//  Defined update route
actionRoutes.route('/update/:id').post(function (req, res) {
    Action.findById(req.params.id, function(err, action) {
    if (!action)
      res.status(404).send("data is not found");
    else {
        action.posts = req.body.posts;
        action.friends = req.body.friends;
        

        action.save().then(action => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
actionRoutes.route('/delete/:id').get(function (req, res) {
    Action.findByIdAndRemove({_id: req.params.id}, function(err, action){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = actionRoutes;