import { Schema, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
//        reactionId: {
//            type: Schema.Types.ObjectId,
//            default: () => new Types.ObjectId(),
//        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

export default reactionSchema;