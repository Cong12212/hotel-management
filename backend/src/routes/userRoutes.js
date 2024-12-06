const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.use(protect);
router.post('/logout', protect, userController.logout);
router.get('/:id', userController.getUser);

router.use(authorize('admin'));

router.get('/', userController.getAllUsers);
router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;