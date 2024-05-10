import { useEffect } from "react";
import { useState } from "react";
import { getComments, postComment } from "../../api";

function PostComment({
  article_id,
  commentCount,
  setCommentCount,
  setDeleted,
}) {
  const [commentsArray, setCommentsArray] = useState([]);
  const [form, setForm] = useState(false);
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState("");
  const [error, setError] = useState("");

  const showForm = () => {
    setError("");
    setForm(!form);
    setPosted("");
    setDeleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0 && body.length === 0) {
      setError("Username and Comment cannot be blank");
    } else if (username.length === 0) {
      setError("Enter a username");
    } else if (body.length === 0) {
      setError("Enter a comment");
    } else {
      setError("");
      setCommentCount(commentCount + 1);
      setPosting(true);
      postComment(article_id, username, body).then((data) => {
        setForm(!form);
        setCommentsArray([data, ...commentsArray]);
        setPosting(false);
        setPosted("Comment Posted");
        setUsername("");
        setBody("");
      });
    }
  };

  if (posting) return <h1>Posting...</h1>;

  return (
    <div>
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
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
      {error && <p>{error}</p>}
      {commentsArray.map((comm) => {
        return (
          <div className="pt-10" key={comm.comment_id}>
            <div className="flex flex-col gap-2 p-2 max-w-5xl border-2 border-black border-solid rounded">
              <p className="font-bold">{comm.author}</p>
              <p>{comm.body}</p>
              <p>{comm.votes} votes</p>
              <p>{comm.created_at.slice(0, 19).replace("T", " ")}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostComment;
