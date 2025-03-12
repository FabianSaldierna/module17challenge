import { Router } from 'express';
const router = Router();
import { getThoughts, createThought, getSingleThought, updateThought, delThought, addReaction, delReaction } from '../../controllers/thoughtController.js';

// /api/thougths
router.route('/').get(getThoughts).post(createThought);

// /api/thougths/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(delThought);

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(delReaction);

export default router;