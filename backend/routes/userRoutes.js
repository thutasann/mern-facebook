const app = require('express');
const { registerValidations, register, loginValidations, login } = require('../controllers/userController');
const router = app.Router();

router.post('/register', registerValidations, register );
router.post('/login', loginValidations, login);

module.exports = router;