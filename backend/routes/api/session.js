// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// backend/routes/api/session.js
// ...
// ...

// backend/routes/api/session.js
// ...

// backend/routes/api/session.js
// ...

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// backend/routes/api/session.js
// ...

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      // const err = new Error('Login failed');
      // err.status = 401;
      // err.title = 'Login failed';
      // err.errors = 'Invalid credentials';
      // return next(err);
      return res.status(401).json({
        errors: ['Invalid credentials'],
        message: 'Invalid credentials',
        statusCode: 401

      })
    }

    const token = await setTokenCookie(res, user);
    user.token = token

    return res.json(user);
      // id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, token: token});
  }
);

// backend/routes/api/session.js
// ...

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// ...


// backend/routes/api/session.js
// ...

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      const id = user.id
      const firstName = user.firstName
      const lastName = user.lastName
      const email = user.email
      const username = user.username
      return res.json({user});
        // id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username
        // : user.toSafeObject()
    } else return res.json({user: null});
  }
);

// ...

module.exports = router;
