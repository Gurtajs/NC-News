import { useEffect, useState } from "react";
import { getComments } from "../../api";
import PostComment from "./PostComment";
import { deleteComment } from "../../api";
import CommentVote from "./CommentVote";
import Vote from "./ArticleVote";

function Comments({ article_id, singleArticle }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(singleArticle.comment_count);
  const [deleted, setDeleted] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  useEffect(() => {
    getComments(article_id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [article_id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return comments === undefined ? (
    <>
      <Vote singleArticle={singleArticle} article_id={article_id} />
      <h1>No comments</h1>
      <PostComment
        article_id={article_id}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
        setDeleted={setDeleted}
        setComments={setComments}
        comments={comments}
      />
      {setComments([])}
    </>
  ) : (
    <>
      <div className="mr-auto">
        <Vote singleArticle={singleArticle} article_id={article_id} />
        <h1 className="translate-y-[-24px] translate-x-[70px]">
          {commentCount} Comments
        </h1>
        {showDeletedMessage ? <h1>Comment deleted...</h1> : null}
        <PostComment
          article_id={article_id}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          setDeleted={setDeleted}
          setComments={setComments}
          comments={comments}
        />
      </div>
      {comments.map((comment, index) => {
        return (
          <div
            className={index === 0 ? "pt-5" : "pt-10"}
            key={comment.comment_id}
          >
            <div className="flex flex-col gap-2 p-2 max-w-5xl border-2 border-black border-solid rounded min-w-auto mr-2">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.body}</p>

              <p>{comment.created_at.slice(0, 19).replace("T", " ")}</p>
            </div>

            <CommentVote comment={comment} />

            {comment.author === "tickle122" ? (
              <button
                onClick={() => {
                  setShowDeletedMessage(true);

                  setTimeout(() => {
                    setShowDeletedMessage(false);
                  }, 1500);
                  setCommentCount(commentCount - 1);
                  deleteComment(comment.comment_id);
                  setComments(
                    comments.filter(
                      (singleComment) =>
                        singleComment.comment_id !== comment.comment_id
                    )
                  );
                }}
              >
                Delete comment
              </button>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default Comments;
