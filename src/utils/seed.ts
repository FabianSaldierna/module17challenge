import connection from '../config/connection.js';
//import { User } from '../models/index.js';
import { User, Thought } from '../models/index.js';
//import Reaction from '../models/Reaction.js'
//import { getRandomName, getRandomReactions, getRandomPost, genRandomIndex } from './data.js';


// Start the seeding runtime timer
console.time('seeding');

connection.on('error', (err) => err);
// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the collections if they exist

    let postCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (postCheck?.length) {
        await connection.dropCollection('thoughts');
    }

    let reactionCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (reactionCheck?.length) {
        await connection.dropCollection('users');
    }

    const users: any[] = [
        {username: "Fabian", email: "fabiansm@gmail.com"},
        { username: "David", email: "david@gmail.com" },
        { username: "Jose", email: "jose@gmail.com" },
    ];


    await User.insertMany(users);

    const thoughts: any[] = [
        { thoughtText: "Decision Trackers are awesome", username: "Fabian" },
        { thoughtText: "Find My Phone is a useful app", username: "David", reactions: [{ reactionBody: "This is a reaction" }] },
        { thoughtText: "Tower Defense is okay, I love it", username: "Fabian", reactions: [{ reactionBody: "This is a reaction" }] },
//        { thoughtText: "Monopoly Money is better than real money IMO", username: "Aurelio", reactions: [{ reactionBody: "Nice" }, { reactionBody: "I agree" }] },
//        { thoughtText: "Movie trailers are just the best parts of a movie distilled into 90 seconds", username: "Smith", reactions: [{ reactionBody: "This is cool" }, { reactionBody: "Super" }] },
//        { thoughtText: "Hello world, this is a comment", username: "Zion", reactions: [{ reactionBody: "This is another reaction and is cool" }, { reactionBody: "Nice" }] },
//        { thoughtText: "Notes is my most used app", username: "Tamar", reactions: [{ reactionBody: "This is very cool" }, { reactionBody: "I'm interested" }] },
//        { thoughtText: "Messages is open on my computer 24/7", username: "Zishan", reactions: [{ reactionBody: "That is very nice" }, { reactionBody: "I disagree" }] },
//        { thoughtText: "Email is open on my computer", username: "Zenithc", reactions: [{ reactionBody: "Ok" }, { reactionBody: "Goodbye" }] },
//        { thoughtText: "Email is open on my computer", username: "Jones", reactions: [{ reactionBody: "Tell me more" }, { reactionBody: "Certainly" }] },
//        { thoughtText: "Email is open on my computer", username: "Jose", reactions: [{ reactionBody: "More people should know this" }, { reactionBody: "Oui" }] },

    ];

    await Thought.insertMany(thoughts);

    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});

    /**
    // Empty arrays for randomly generated thoughts and reactions
    const reactions: any[] = [...getRandomReactions(10)];
    const thoughts: any[] = [];

    // Makes reactions array
    const makePost = (text: string) => {
        thoughts.push({
            text,
            username: getRandomName().split(' ')[0],
            reactions: [reactions[genRandomIndex(reactions)]._id],
        });
    };

    // Wait for the reactions to be inserted into the database
    await Reaction.insertMany(reactions);

    // For each of the reactions that exist, make a random post of 10 words
    reactions.forEach(() => makePost(getRandomPost(10)));

    // Wait for the thoughts array to be inserted into the database
    await Post.insertMany(thoughts);

    // Log out a pretty table for reactions and thoughts
    console.table(reactions);
    console.table(thoughts);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);

 */

