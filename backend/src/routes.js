const express = require('express');

const validation = require('./utils/validation');
const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', validation.sessions.post, SessionController.create);

routes.get('/ngos', NgoController.index);
routes.post('/ngos', validation.ngos.post, NgoController.create);

routes.get('/profiles', validation.profiles.get, ProfileController.index);

routes.get('/incidents', validation.incidents.get, IncidentController.index);
routes.get('/incidents/:id', validation.incidents.getById, IncidentController.get);
routes.post('/incidents', validation.incidents.post, IncidentController.create);
routes.delete('/incidents/:id', validation.incidents.delete, IncidentController.delete);

module.exports = routes;
