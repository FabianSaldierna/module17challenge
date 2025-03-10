import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, putUser, delUser, addFriend, removeFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(putUser).delete(delUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;
