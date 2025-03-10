import { Router } from 'express';
const router = Router();
import {
  getApplicationStats,
  getCurrentUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { validateUserUpdate } from '../middleware/validationMiddleware.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
router.get('/', getCurrentUser);
router.get('/stats', [authorizePermissions('admin'), getApplicationStats]);
router.put(
  '/update-user',
  // checkForTestUser,
  // upload.single('avatar'),

  updateUser
);
router.get('/all', getUsers);

export default router;
