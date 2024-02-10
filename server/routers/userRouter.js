const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');

router.get('/signup',
(req, res) => res.sendFile(path.resolve(__dirname, '../../client/signup.html'))
);

router.get('/signin.js', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../client/signin.js')));

router.get('/signup.js', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../client/signup.js')));

router.get('/main.js', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../client/main.js')));

router.get('/task.js', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../client/task.js')));

router.post('/signup',
  userController.createUser,
  sessionController.setCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json(res.locals.status));

router.post('/signin',
userController.verifyUser,
sessionController.setCookie,
sessionController.startSession,
(req, res) => res.status(200).json(res.locals.status));


module.exports = router;