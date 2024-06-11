import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import DeleteArticle from "./DeleteArticle";

function Article({ articles, setArticles }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="pt-5 pb-3 text-3xl">Available articles</h1>
    <ol>
      {articles.map((article, index) => {
        return (
          <div key={article.article_id}>
            <li className={index===0 ? "mt-5 max-w-[800px] max-h-[350px]" : "mt-10 max-w-[800px] max-h-[350px]"}>
              <Link to={`article/${article.article_id}`} >
              <h2 className="text-lg font-bold flex justify-center mb-3 flex-wrap">
                {article.title}
              </h2>
              <div className="flex items-center">
                <img
                  src={article.article_img_url}
                  alt="article image"
                  className="max-w-[400px] max-h-[300px]"
                />
                <div className="flex flex-col gap-5 pl-10 pt-5">
                  <div className="flex items-center gap-2">
                    <div>
                      <FaUser />
                    </div>
                    <p>{article.author}</p>
                  </div>
                  <p>Topic: {article.topic}</p>
                  <p>{article.votes} Likes</p>
                  <p>{article.comment_count} comments</p>
                  <p>
                    Posted on:{" "}
                    {article.created_at.slice(0, 19).replace("T", " ")}
                  </p>
                </div>
              </div>
              </Link>
            </li>
            <DeleteArticle articles={articles} setArticles={setArticles} article={article}/>
            </div>
        );
      })}
    </ol>
    </div>
  );
}

export default Article;
