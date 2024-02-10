const db = require('../models/models.js');
const path = require('path');
const sessionController = {};

sessionController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user_id, {httpOnly: true});
  return next();
};

sessionController.startSession = async (req, res, next) => {
  try {
    const session = await db.Session.findOne({cookieId: res.locals.user_id});
    if (!session) {
      const newSession = await db.Session.create({cookieId: res.locals.user_id});
    };
    return next();
  } catch (error) {
    console.log('Error in startSession middleware => ', error)
  };
};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    const { ssid } = req.cookies
    const session = await db.Session.findOne({cookieId: ssid})
    if (session) {
      return next();
    } else {
      res.sendFile(path.join(__dirname, '../../client/signin.html'));
    };
  } catch (error) {
    console.log('Error in isLoggedIn middleware => ', error);
  }
}

module.exports = sessionController;