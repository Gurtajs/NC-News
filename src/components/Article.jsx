import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Article({ articles }) {
  return (
    <ol>
      {articles.map((article) => {
        return (
          <Link to={`article/${article.article_id}`} key={article.article_id}>
            <li className="pt-10">
              <h2 className="font-bold inline-break break-all w-100">
                {article.title}
              </h2>
              <div className="flex">
                <img
                  src={article.article_img_url}
                  alt="article image"
                  width="300px"
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
            </li>
          </Link>
        );
      })}
    </ol>
  );
}

export default Article;
