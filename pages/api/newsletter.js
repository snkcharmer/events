import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid Email Address'}); //Invalid Input 422
            return; 
        }

        const client = await MongoClient.connect('mongodb+srv://jaryddcinco:5mnlTIjV1fFIAKju@cluster0.nwah1se.mongodb.net/?retryWrites=true&w=majority') 
        const db = client.db('event');

        await db.collection('newsletter').insertOne({email: userEmail});
        client.close();
        // console.log(userEmail);
        res.status(201).json({message: 'Added email to newsletter'});

    }
}

export default handler;