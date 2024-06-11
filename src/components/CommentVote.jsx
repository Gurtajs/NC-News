import { upvoteComment, downvoteComment } from "../../api";
import { useState } from "react";

function CommentVote({ comment }) {
  const [commentVote, setCommentVote] = useState(comment.votes);
  const [errorMessage, setErrorMessage] = useState(null);

  const upvote = () => {
    setCommentVote((currentVote) => currentVote + 1);
    setErrorMessage(null);
    upvoteComment(comment.comment_id).catch(() => {
      setCommentVote((currentVote) => currentVote - 1);
      setErrorMessage("Something went wrong, please try again");
    });
  };

  const downvote = () => {
    setCommentVote((currentVote) => currentVote - 1);
    setErrorMessage(null);
    downvoteComment(comment.comment_id).catch(() => {
      setCommentVote((currentVote) => currentVote + 1);
      setErrorMessage("Something went wrong, please try again");
    });
  };

  return (
    <div className="flex gap-10">
      <p>{commentVote} votes</p>
      <button onClick={upvote}>Like</button>
      <button onClick={downvote}>Dislike</button>
      {errorMessage ? errorMessage : null}
    </div>
  );
}

export default CommentVote;
