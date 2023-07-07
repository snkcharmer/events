import { useState, useRef } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentItems, setCommentItems] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    fetch("/api/comment")
      .then((response) => response.json())
      .then((data) => setCommentItems(data));
  }

  function addCommentHandler(commentData) {
    // send data to API
    // console.log(commentData);
    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        id: commentData.id,
        email: commentData.email,
        name: commentData.name,
        text: commentData.text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => commentItems(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={commentItems} />}
    </section>
  );
}

export default Comments;
