import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //TODO: check for valid mail
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.friends.length}`;
    })


// Initialize our User model
const User = model('user', userSchema);

export default User;
