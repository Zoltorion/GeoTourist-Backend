import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { generateAuthToken } from './helper.js';
import './loadenv.js';

// the closing of the connection is moved to an unreachable section since it wasn't working for some reason previously
//! It's definitely bad practice that we're going to make better

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const SALT_ROUNDS = 16;
let usersArr, user, newUser;

export const QueryUsers = async function()
{
    try
    {
        const db = client.db('geodb');
        const users = db.collection('users');
        usersArr = await users.find({}).toArray();
    }
    finally
    {
        return usersArr;
    }
    await client.close();
}

export const FindUser = async function(email, username)
{
    try
    {
        const db = client.db('geodb');
        const users = db.collection('users');

        const query = {
            "email": new RegExp('^' + email + '$'),
            "username": new RegExp('^' + username + '$')
        };

        user = await users.findOne(query);
    }
    finally
    {
        return user;
    }
    await client.close();
}

export const FindUsersByField = async function (field, value) {
    try {
        const db = client.db('geodb');
        const usersCollection = db.collection('users');

        if (field == "password")
        {
            throw new Error("Cannot search by password");
        }

        const query = {};
        query[field] = new RegExp(value, 'i'); // Use case-insensitive regex for partial matches

        usersArr = await usersCollection.find(query).toArray();
    } catch (error) {
        console.error("Error finding users:", error);
    } finally {
        return usersArr;
    }
    await client.close();
};

export const FindUserByID = async function(_id)
{
    try {
        const db = client.db('geodb');
        const users = db.collection('users');

        user = await users.findOne(new ObjectId(_id));
    } catch (error) {
        console.error("Unable to find user with input id", error);
    } finally {
        return user;
    }
}

export const AddUser = async function(email, username, password)
{
    try
    {
        const db = client.db('geodb');
        const users = db.collection('users');

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        const doc = {
            "email": email,
            "username": username,
            "password": hash
        };

        const checkUser = await users.findOne(doc);
        if (checkUser) {
            throw new Error('User already exists');
        } else {
            doc._id = (await users.insertOne(doc)).insertedId;
            newUser = doc;

            // await users.insertOne(doc);
    
            // const query = {
            //     "email": new RegExp('^' + email + '$'),
            //     "username": new RegExp('^' + username + '$'),
            //     "password": new RegExp('^' + hash + '$')
            // };
            // newUser = await users.findOne(query);
        }
    }catch (error) {
        console.log("Error adding user:", error);
    }
    finally
    {
        return generateAuthToken(newUser);
    }
    await client.close();
}

export const Login = async function (emailOrUsername, password) {
    try {
        const db = client.db('geodb');
        const usersCollection = db.collection('users');

        // Find the user by email or username
        user = await usersCollection.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if the provided password matches the stored password (you should use a secure method like bcrypt for this)
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate and return an authentication token (you would use a secure method for this)
        const authToken = generateAuthToken(user);

        return authToken;
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error
    } finally {
    }
    await client.close();
};
