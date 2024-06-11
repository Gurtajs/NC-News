import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { getArticleById } from "../../api";
import Comments from "./Comments";
import { FaUser } from "react-icons/fa";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  const [error, setError] = useState(null);

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setSingleArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Article not found");
      });
  }, [article_id]);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (loading) {
    return <h2 className="pl-20">The article is loading, thank you for your patience!</h2>;
  }

  const formattedData = singleArticle.created_at.slice(0, 19).replace("T", " ");
  
  const handleNavigation = () => {
    navigate(-1)
  }

  return (
      <>
      {window.location.href.includes(`articles/topic/${singleArticle.topic}/article`)?<button onClick={handleNavigation} className="ml-20 border-2 border-gray-500 rounded-sm p-1">Go back to filtered articles</button>: <button onClick={handleNavigation} className="ml-20 border-2 border-gray-500 rounded-sm p-1">Go back to home page</button>}
      <div className="flex flex-col items-center max-w-[900px] mx-auto pt-5">
        <h2 className="font-bold w-100 text-lg mb-2">{singleArticle.title}</h2>
        <img
          src={singleArticle.article_img_url}
          alt="article image"
          className="w-[100%] max-w-[550px] h-auto"
        />
        <div className="flex flex-col gap-5 pl-10 pt-5">
          <div className="flex flex-row items-center justify-between pr-4">
            <div className="flex items-center gap-2">
              <FaUser />
              <p>{singleArticle.author}</p>
            </div>
            <div>
              <p>Topic: {singleArticle.topic}</p>
            </div>
          </div>
          <p className="max-w-[900px]">{singleArticle.body}</p>
          <p>Posted on: {formattedData}</p>
        </div>
        <div className="pl-10">
        <Comments article_id={article_id} singleArticle={singleArticle} />
        </div>
      </div>
      </>
  );
}

export default SingleArticle;
