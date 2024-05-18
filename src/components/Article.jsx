import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";


function Article({ articles }) {
  return (
    <>
    <ol>
      {articles.map((article, index) => {
        return (
            <li className={index===0 ? "mt-5 max-w-[650px] max-h-[290px]" : "mt-10 max-w-[650px] max-h-[290px]"} key={article.article_id}>
              <Link to={`article/${article.article_id}`} >
              <h2 className="font-bold">
                {article.title}
              </h2>
              <div className="flex">
                <img
                  src={article.article_img_url}
                  alt="article image"
                  className="max-w-[300px] max-h-[300px]"
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
                    Article date:{" "}
                    {article.created_at.slice(0, 19).replace("T", " ")}
                  </p>
                </div>
              </div>
              </Link>
            </li>
        );
      })}
    </ol>
    </>
  );
}

export default Article;
