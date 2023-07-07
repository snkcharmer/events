import classes from "./comment-list.module.css";

function CommentList(props) {
  const { comments } = props;
  console.log(comments);
  return (
    <ul className={classes.comments}>
      {
        /* Render list of comments - fetched from API */
        // comments.map((data) => (
        //   <li>
        //     <p>{data.comment}</p>
        //     <div>
        //       By <address>{data.name}</address>
        //     </div>
        //   </li>
        // ))
      }
    </ul>
  );
}

export default CommentList;
