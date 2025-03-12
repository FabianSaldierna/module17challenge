import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';


// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        console.log("Entra aqui");
        const users = await User.find()
            .select('-__v')
            .populate({ path: 'thoughts', select: '-v' })
            .populate({ path: 'friends', select: '-v' });
        res.json(users);
        console.log(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({path: 'thoughts', select: '-v'})
           .populate({path: 'friends', select: '-v'});

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete a user and associated apps
export const delUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }else{

        await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .populate({ path: 'thoughts', select: '-v' })
            .populate({ path: 'friends', select: '-v' });
            
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(friend);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//Add Friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const idFriend = req.params.friendId;
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends:  idFriend}  },
            { runValidators: true, new: true }
        )
            .populate({ path: 'thoughts', select: '-v' })
            .populate({ path: 'friends', select: '-v' });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const idFriend = req.params.friendId;
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: idFriend } },
            { runValidators: true, new: true }
        )
            .populate({ path: 'thoughts', select: '-v' })
            .populate({ path: 'friends', select: '-v' });

        if (!user) {
            res.status(404).json({ message: 'No user found!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
}