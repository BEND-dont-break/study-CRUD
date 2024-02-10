const db = require('../models/models.js')
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  if (username !== null && password !== null && typeof username === 'string' && typeof password === 'string') {
    const user = await db.User.create({ username, password });
    console.log('user => ', user._id)
    res.locals.user_id = user._id;
    res.locals.status = 'Success!'
    return next();
  } else {
    console.log('Redirect');
    res.locals.status = 'Error in sign up!'
    return next();
  };
};

userController.verifyUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await db.User.findOne({ username });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          res.locals.user_id = user._id;
          res.locals.status = 'Success!'
          return next();
        } else {
          res.locals.status = 'Error in sign up!'
          return next();
        };
      })
    }
  } catch (error) {
    console.log('Error in verifyUser middleware => ', error);
  };
}

module.exports = userController;