// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })
    // This is a server side validation
    const eventId = req.query.eventId;

    if (req.method === 'POST'){
        const { email, name, text } = req.body;

        if (!email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === '') {
            res.status(422).json({ message: 'Invalid input' });
            return;
        }

        const newComment = {
            id: new Date().toISOString(),
            email, name, text
        }

        console.log(newComment);

        res.status(201).json({ message: 'Success', comment: newComment })
    }

    if (req.method === 'GET'){
        const dummyList = [ 
            { id: 'c1', name: 'jarydd', text: "1st comment"},
            { id: 'c2', name: 'areane', text: "2nd comment"},
        ];

        res.status(201).json({ comments: dummyList });
    }
}
  