import { getSortedByTopic } from "../../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import TopicList from "./TopicList";
import { FaUser } from "react-icons/fa";
import DeleteArticle from "./DeleteArticle";

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
      console.log(data);
      setArticlesByTopic(data);
    });
    const newParams = new URLSearchParams();
    newParams.set("sortby", selectedSortBy);
    newParams.set("orderby", selectedOrderBy);
    navigate(`?${newParams.toString()}`);
  }, [selectedSortBy, selectedOrderBy, topic, navigate]);

  return (
    <>
      <div className="flex gap-[50px] pl-20">
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
      <TopicList/>
      <Link to="/" className="ml-20 border-2 border-gray-500 rounded-sm p-1">
        Go back to home page
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="pt-5">
          {!articlesByTopic === 0
            ? topic[0].toUpperCase() + topic.slice(1) + "related articles"
            : null}
        </h1>
        <ol>
          {articlesByTopic.map((articleByTopic) => {
            return (
              <div key={articleByTopic.article_id}>
                <li className={"pt-10 list-none max-w-[800px] max-h-[350px]"}>
                  <Link to={`article/${articleByTopic.article_id}`}>
                    <h2
                      className={"text-lg justify-center font-bold flex mb-3"}
                    >
                      {articleByTopic.title}
                    </h2>
                    <div className="flex items-center">
                      <img
                        src={articleByTopic.article_img_url}
                        alt="article image"
                        className="max-w-[400px] max-h-[300px]"
                      />
                      <div className="flex flex-col gap-5 pl-5 pt-5">
                        <div className="flex items-center gap-2">
                          <div>
                            <FaUser />
                          </div>
                          <p>{articleByTopic.author}</p>
                        </div>
                        <p>Topic: {articleByTopic.topic}</p>
                        <p>{articleByTopic.votes} Likes</p>
                        <p>{articleByTopic.comment_count} comments</p>
                        <p>
                          Posted on:{" "}
                          {articleByTopic.created_at
                            .slice(0, 19)
                            .replace("T", " ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <DeleteArticle
                  articles={articlesByTopic}
                  setArticles={setArticlesByTopic}
                  article={articleByTopic}
                />
              </div>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default SortArticlesByTopic;
