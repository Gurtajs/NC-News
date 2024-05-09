import { useEffect } from "react";
import { useState } from "react";
import { getComments, postComment } from "../../api";

function PostComment({ article_id, formattedData, singleArticle }) {
  const [comment, setComment] = useState([]);
  const [form, setForm] = useState(false);
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [commentCount, setCommentCount] = useState(singleArticle.comment_count);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState("")

  const showForm = () => {
    setForm(!form);
    setPosted("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentCount(commentCount + 1);
    setPosting(true);
    postComment(article_id, username, body).then((data) => {
      setForm(!form);
      setComment([data, ...comment]);
      setPosting(false);
      setPosted("Comment Posted")
      setUsername("");
      setBody("");
    });
  };

  if (posting) return <h1>Posting...</h1>;

  return (
    <div>
      <h1>{commentCount} Comments</h1>
      <button
        className="border-2 border-black rounded-lg p-1"
        onClick={showForm}
      >
        Post Comment
      </button>
      {posted}
      {form ? (
        <form>
          <label htmlFor="author">Author</label>
          <input
            id="username"
            type="text"
            placeholder="author name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="body">Comment</label>
          <input
            id="body"
            type="text"
            placeholder="enter comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <input type="submit" onClick={handleSubmit} />
        </form>
      ) : null}

      {comment.map((comm) => {
        return (
          <div className="pt-10" key={comm.comment_id}>
            <div className="flex flex-col gap-2 p-2 max-w-5xl border-2 border-black border-solid rounded">
              <p className="font-bold">{comm.author}</p>
              <p>{comm.body}</p>
              <p>{comm.votes} votes</p>
              <p>{comm.created_at.slice(0,19).replace("T", " ")}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostComment;
