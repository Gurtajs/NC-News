import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../api";

function Comments({singleArticle, formattedData}) {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getComments(article_id).then((data) => {
      setComments(data);
    });
  }, [article_id]);


  return comments===undefined ? (
    <h1>No comments found</h1>
   ) : (
      <>
      <h1 className="pt-5">{singleArticle.comment_count} Comments</h1>
      {comments.map((comment) => {
        return (
          <div className="pt-10" key={comment.comment_id}>
          <div className = "flex flex-col gap-2 p-2 max-w-5xl border-2 border-black border-solid rounded">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.votes} votes</p>
            <p>{formattedData}</p>
          </div>
          </div>
        );
      })}
      </>
    ) 

  
 
}

export default Comments;
