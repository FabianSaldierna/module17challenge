import { User, Thought } from '../models/index.js';
//import Reaction from '../models/Reaction.js';
import { Request, Response } from 'express';


// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
            .select('-__v')
            .populate({ path: 'reactions', select: '-v' });
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate({ path: 'reactions', select: '-v' });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        //create new thought
        const thought = await Thought.create(req.body);
        console.log(thought);
        
        //add thought to user
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );
        console.log(user);
        res.status(200).json(thought);

    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete a thought and associated apps
export const delThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json({ message: 'Thought deleted!' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Update thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        const friend = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(friend);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//Add Reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        res.json(thought);
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

//Remove Reaction
export const delReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        res.json(thought);
        if (!thought) {
            res.status(404).json({ message: 'No application with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);

    }
}