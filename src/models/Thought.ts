import { Schema, model, Document, ObjectId } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            String,
            required: true,
         },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            String,
            required: true,
        },
        reactions: {
            type: [Reaction],
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reactions.length}`;
    })

const Thought = model('thought', thoughtSchema);

export default Thought;
