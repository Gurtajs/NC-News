import { getSortedByTopic } from "../../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaUser, FaComments, FaRegCalendarAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import DeleteArticle from "./DeleteArticle";
import Topics from "./Topics";

function SortArticlesByTopic() {
  const [selectedSortBy, setSelectedSortBy] = useState(
    sessionStorage.getItem("selectedSortBy") || "created_at"
  );
  const [selectedOrderBy, setSelectedOrderby] = useState(sessionStorage.getItem("selectedOrderBy")||"desc");
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const { topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSortedByTopic(topic, selectedSortBy, selectedOrderBy).then((data) => {
      setArticlesByTopic(data);
    });
    const newParams = new URLSearchParams();
    newParams.set("sortby", selectedSortBy);
    newParams.set("orderby", selectedOrderBy);
    navigate(`?${newParams.toString()}`);
  }, [selectedSortBy, selectedOrderBy, topic, navigate]);

  return (
    <>
      <div className="flex flex-col gap-[6px] sm:flex sm:flex-row sm:gap-[50px]">
        <label htmlFor="sortby">
          Sort articles by:
          <select
            id="sortby"
            className="border-2 border-gray-500 rounded-md ml-1"
            name="sortby"
            value={selectedSortBy}
            onChange={(e) => {
              setSelectedSortBy(e.target.value);
              sessionStorage.setItem("selectedSortBy", e.target.value);
            }}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </label>

        <label htmlFor="orderby">
          Order articles by:
          <select
            id="orderby"
            className="border-2 border-gray-500 rounded-md ml-1"
            name="orderby"
            value={selectedOrderBy}
            onChange={(e) => {
              setSelectedOrderby(e.target.value);
              sessionStorage.setItem("selectedOrderBy", e.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <Topics/>
      <Link to="/" className="border-2 border-gray-500 rounded-sm p-1">
        Go back to home page
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="pt-5">
          {!articlesByTopic === 0
            ? topic[0].toUpperCase() + topic.slice(1) + "related articles"
            : null}
        </h1>
        <ol>
          {articlesByTopic.map((articleByTopic, index) => {
            return (
              <div key={articleByTopic.article_id} className="w-[100%] sm:w-[600px] mb-[50px]">
                <li className={index===0 ? "mt-5 max-w-[800px]" : "max-w-[800px]"}>
                  <Link to={`article/${articleByTopic.article_id}`}>
                    <h2
                      className="text-lg font-bold flex justify-center sm:pb-4 flex-wrap"
                    >
                      {articleByTopic.title}
                    </h2>
                    <div className="sm:flex sm:justify-center sm:items-center gap-8">
                      <img
                        src={articleByTopic.article_img_url}
                        alt="article image"
                        className="min-w-[350px] max-w-[100%] sm:max-w-[400px] min-h-[250px] max-h-[300px]"
                        />
                      <div className="flex-col gap-2 sm:flex-col sm:gap-6 ">
                  <div className="flex justify-between pr-2 sm:block">
                  <div className="flex items-center gap-2 sm:pb-4">
                    <div>
                      <FaUser />
                    </div>
                    <p>{articleByTopic.author}</p>
                  </div>
                  <div className="flex items-center content-center gap-3 sm:block">
                  <p className="flex gap-1 items-center sm:pb-4">{articleByTopic.votes} <FcLike /></p>
                  <p className="flex gap-2 items-center sm:pb-4">{articleByTopic.comment_count} <FaComments /></p>
                  </div>
                  </div>
                  <div className="flex gap-8 sm:block">
                  <p className="whitespace-nowrap sm:pb-4">Topic: {articleByTopic.topic}</p>
                  <>
                  <div className="whitespace-nowrap flex gap-3 items-center">
                  <div>
                  <FaRegCalendarAlt />
                  </div>
                  <p>
                   {" "+((articleByTopic.created_at)[8]+(articleByTopic.created_at)[9]+"-"+(articleByTopic.created_at)[5]+(articleByTopic.created_at)[6]+"-"+(articleByTopic.created_at)[0]+(articleByTopic.created_at)[1]+(articleByTopic.created_at)[2]+(articleByTopic.created_at)[3]+" "+(articleByTopic.created_at)[11]+String(Number((articleByTopic.created_at)[12])+1)+(articleByTopic.created_at)[13]+(articleByTopic.created_at)[14]+(articleByTopic.created_at)[15])}
                   </p>
                  </div>
                  </>
                  </div>
                  </div>
                </div>
              </Link>
            </li>
            <DeleteArticle articles={articlesByTopic} setArticles={setArticlesByTopic} article={articleByTopic} />
            </div>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default SortArticlesByTopic;
