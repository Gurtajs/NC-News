import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { getArticleById } from "../../api";
import Comments from "./Comments";
import { FaUser, FaRegCalendarAlt } from "react-icons/fa";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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
    return <h2>The article is loading, thank you for your patience!</h2>;
  }

  const formattedData = singleArticle.created_at.slice(0, 19).replace("T", " ");

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <>
      {window.location.href.includes(
        `articles/topic/${singleArticle.topic}/article`
      ) ? (
        <button
          onClick={handleNavigation}
          className="border-2 border-gray-500 rounded-sm p-1"
        >
          Go back to filtered articles
        </button>
      ) : (
        <button
          onClick={handleNavigation}
          className="border-2 border-gray-500 rounded-sm p-1"
        >
          Go back to home page
        </button>
      )}
      <div className="flex flex-col items-center mx-auto w-[100%] pt-5">
        <h2 className="font-bold w-100 text-lg mb-2">{singleArticle.title}</h2>
        <img
          src={singleArticle.article_img_url}
          alt="article image"
          className="w-[100%] max-w-[550px] h-auto"
        />
        <div className="max-w-[900px]">
        <div className="flex flex-col gap-5 pt-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser />
              <p>{singleArticle.author}</p>
            </div>
            <div>
              <p>Topic: {singleArticle.topic}</p>
            </div>
          </div>
          <p className="w-[100%]">{singleArticle.body}</p>
          <div className="flex items-center gap-2">
            <div>
              <FaRegCalendarAlt />
            </div>
            <div>{" "+((singleArticle.created_at)[8]+(singleArticle.created_at)[9]+"-"+(singleArticle.created_at)[5]+(singleArticle.created_at)[6]+"-"+(singleArticle.created_at)[0]+(singleArticle.created_at)[1]+(singleArticle.created_at)[2]+(singleArticle.created_at)[3]+" "+(singleArticle.created_at)[11]+String(Number((singleArticle.created_at)[12])+1)+(singleArticle.created_at)[13]+(singleArticle.created_at)[14]+(singleArticle.created_at)[15])}</div>
          </div>
        </div>
        <div>
          <Comments article_id={article_id} singleArticle={singleArticle} />
        </div>
        </div>
      </div>
    </>
  );
}

export default SingleArticle;
