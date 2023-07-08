import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  // console.log(items);
  return (
    <ul className={classes.comments}>
      {
        /* Render list of comments - fetched from API */
        items.map((data) => (
          <li key={data.id}>
            <p>{data.text}</p>
            <div>
              By <address>{data.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;
