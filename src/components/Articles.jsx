import { Link } from "react-router-dom";
import { FaUser, FaComments, FaRegCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import DeleteArticle from "./DeleteArticle";

function Article({ articles, setArticles }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="pt-5 pb-3 text-3xl">Available articles</h1>
      <ol>
          {articles.map((article, index) => {
            return (
              <div key={article.article_id} className="w-[100%] sm:w-[600px] mb-[50px]">
                <li className={index===0 ? "mt-5 max-w-[800px]" : "max-w-[800px]"}>
                  <Link to={`article/${article.article_id}`}>
                    <h2
                      className="text-lg font-bold flex justify-center sm:pb-4 flex-wrap"
                    >
                      {article.title}
                    </h2>
                    <div className="sm:flex sm:justify-center sm:items-center gap-8">
                      <img
                        src={article.article_img_url}
                        alt="article image"
                        className="min-w-[350px] max-w-[100%] sm:max-w-[400px] min-h-[250px] max-h-[300px]"
                        />
                      <div className="flex-col gap-2 sm:flex-col sm:gap-6 ">
                  <div className="flex justify-between pr-2 sm:block">
                  <div className="flex items-center gap-2 sm:pb-4">
                    <div>
                      <FaUser />
                    </div>
                    <p>{article.author}</p>
                  </div>
                  <div className="flex items-center content-center gap-3 sm:block">
                  <p className="flex gap-1 items-center sm:pb-4">{article.votes} <FcLike /></p>
                  <p className="flex gap-2 items-center sm:pb-4">{article.comment_count} <FaComments /></p>
                  </div>
                  </div>
                  <div className="flex gap-8 sm:block">
                  <p className="whitespace-nowrap sm:pb-4">Topic: {article.topic}</p>
                  <>
                  <div className="whitespace-nowrap flex gap-3 items-center">
                  <div>
                  <FaRegCalendarAlt />
                  </div>
                  <p>
                   {" "+((article.created_at)[8]+(article.created_at)[9]+"-"+(article.created_at)[5]+(article.created_at)[6]+"-"+(article.created_at)[0]+(article.created_at)[1]+(article.created_at)[2]+(article.created_at)[3]+" "+(article.created_at)[11]+String(Number((article.created_at)[12])+1)+(article.created_at)[13]+(article.created_at)[14]+(article.created_at)[15])}
                   </p>
                  </div>
                  </>
                  </div>
                  </div>
                </div>
              </Link>
            </li>
            <DeleteArticle articles={articles} setArticles={setArticles} article={article} />
            </div>
            );
          })}
        </ol>
      </div>
  );
}

export default Article;
