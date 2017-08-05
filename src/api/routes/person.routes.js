
// sanitize input
  // validate permission
    // validate input
      // handleRequest

'use strict';

var express = require('express');
var router = express.Router();

var permission = require('../permissions/person.permissions');

var personCtrl = require('../controllers/person.controller');
var identifierCtrl = require('../controllers/identifier.controller');
var linkCtrl = require('../controllers/link.controller');
var personContactCtrl = require('../controllers/person_contact.controller');
var personJobCtrl = require('../controllers/person_job.controller');
var personOthernameCtrl = require('../controllers/person_othername.controller');


module.exports = function(app){

  /**
   *
   *  GET requests for persons.
   *
   **/
  router.get( '/',          permission.canView, personCtrl.index );
  router.get('/query',      permission.canView, personCtrl.query );
  router.get('/:personId',  permission.canView, personCtrl.show );


  /**
   *
   *  POST requests for persons.
   *
   **/
  router.post('/',                      permission.canCreate, personCtrl.create );
  router.post('/:personId/othername',   permission.canCreate, personOthernameCtrl.create );
  router.post('/:personId/contact',     permission.canCreate, personContactCtrl.create );
  router.post('/:personId/job',         permission.canCreate, personJobCtrl.create);


  /**
   *
   *  PUT requests for persons.
   *
   **/
  router.put('/:personId',            permission.canUpdate, personCtrl.update );
  router.put('/:personId/othername',  permission.canUpdate, personOthernameCtrl.update );
  router.put('/:personId/contact',    permission.canUpdate, personContactCtrl.update );
  router.put('/:personId/job',        permission.canUpdate, personJobCtrl.update );


  /**
   *
   *  DELETE requests for persons.
   *
   **/
  router.delete('/:personId',                         permission.canDelete, personCtrl.delete );
  router.delete('/:personId/othername/:othernameId',  permission.canDelete, personOthernameCtrl.delete );
  router.delete('/:personId/contact/:contactId',      permission.canDelete, personContactCtrl.delete );
  router.delete('/:personId/job/:jobId',              permission.canDelete, personJobCtrl.delete );


  // Add the person endpoint to the router.
  app.use('/person', router);
};
