import { deleteArticle } from "../../api";

function DeleteArticle({ articles, setArticles, article }) {
  const handleClick = () => {
    deleteArticle(article.article_id);
    setArticles(
      articles.filter(
        (singleArticle) => singleArticle.article_id != article.article_id
      )
    );
  };

  return (
    <>
      {article.author === "tickle122" ? (
        <button
          className="border-2 border-black rounded-md mt-2 p-1"
          onClick={handleClick}
        >
          Delete article
        </button>
      ) : null}
    </>
  );
}

export default DeleteArticle;
