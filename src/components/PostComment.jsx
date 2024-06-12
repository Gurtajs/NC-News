import { useState } from "react";
import { postComment } from "../../api";

function PostComment({
  article_id,
  commentCount,
  setCommentCount,
  setDeleted,
  setComments,
  comments
}) {

  const [form, setForm] = useState(false);
  const [username, setUsername] = useState("tickle122");
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
    if (body.length === 0) {
      setError("Enter a comment");
    } else {
      setError("");
      setCommentCount(commentCount + 1);
      setPosting(true);
      postComment(article_id, username, body).then((data) => {
        setForm(!form);
        setComments([data, ...comments])
        setPosting(false);
        setPosted("Comment Posted");
        setBody("");
      });
    }
  };

  if (posting) return <h1>Posting...</h1>;
  
  return (
    <div>
       <div className="flex items-center gap-5 mb-2">
       <h1>Want to share your thoughts?</h1>
      <button
        className="border-2 border-black rounded-md p-1 "
        onClick={showForm}
      >
        Post a comment
      </button>
      </div>
      
      {posted}
      {form ? (
        <form>
           <h1>Signed in as: <span className="text-orange-500 ">tickle122</span></h1>
          <label className= "mr-2" htmlFor="body">Comment</label>
          <input
            id="body"
            type="text"
            placeholder=""
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className= "border-2 border-gray-500 rounded-sm mr-4"
          />
          <input className= "border-2 border-black rounded-md p-1 cursor-pointer mt-2" type="submit" onClick={handleSubmit} />
        </form>
      ) : null}
     
      {error && <p>{error}</p>}
    </div>
    
  );
}

export default PostComment;
