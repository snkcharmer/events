import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.text;

    const newComment = {
      id: new Date().toISOString(),
      email: email,
      name: name,
      comment: comment,
    };

    const filePath = path.join(process.cwd(), "data", "comment.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "This works!" });
  } else {
    const filePath = path.join(process.cwd(), "data", "comment.json");
    const fileData = fs.readFileSync(filePath);
    res.status(200).json({ details: fileData });
  }
}

export default handler;
