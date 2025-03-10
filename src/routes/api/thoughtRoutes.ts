import { Router } from 'express';
const router = Router();
import { getThoughts, createThought, getSingleThought, putThought, delThought, addReaction, delReaction } from '../../controllers/thoughtController.js';

// /api/thougths
router.route('/').get(getThoughts).post(createThought);

// /api/thougths/:userId
router.route('/:thoughtId').get(getSingleThought).put(putThought).delete(delThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionID').delete(delReaction);

export default router;