import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { upVote, downVote } from "../../api";

function Vote({ singleArticle, article_id }) {
  const [vote, setVote] = useState(singleArticle.votes);
  const [err, setErr] = useState(null);

  const handleClickUp = () => {
    setVote((currentVote) => currentVote + 1);
    setErr(null);
    upVote(article_id).catch((err) => {
      setVote((currentVote) => currentVote - 1);
      setErr("Something went wrong, please try again");
    });
  };

  const handleClickDown = () => {
    setVote((currentVote) => currentVote - 1);
    setErr(null);
    downVote(article_id).catch((err) => {
      setVote((currentVote) => currentVote + 1);
      setErr("Something went wrong, please try again");
    });
  };

  return (
    <>
      <div className="flex gap-10 pt-3 pb-1">
        <FaThumbsUp size={25} onClick={handleClickUp} />
        <FaThumbsDown size={25} onClick={handleClickDown} />
      </div>
      {err ? <p>{err}</p> : null}
      <h1>{vote} Likes</h1>
    </>
  );
}

export default Vote;
