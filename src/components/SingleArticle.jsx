import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import Comments from "./Comments";
import { FaUser } from "react-icons/fa";
import Vote from "./Vote";


function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState({});
	const [loading, setLoading] = useState(true)
  const { article_id } = useParams();


  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setSingleArticle(data);
			setLoading(false)
    });
  }, [article_id]);

	if (loading) {
		return <h2>Loading...</h2>
		}
	
	const formattedData = singleArticle.created_at.slice(0, 19).replace("T", " ")

  return (
    <>
      <h2 className="font-bold inline-break break-all w-100">
        {singleArticle.title}
      </h2>
      <div className="flex">
        <img src={singleArticle.article_img_url} alt="article image" width="300px" height="200px" />
        <div className="flex flex-col gap-5 pl-10 pt-5">
					<div className="flex items-center gap-2"><div><FaUser /></div><p>{singleArticle.author}</p></div>
          <p>Topic: {singleArticle.topic}</p>
          <p className="w-[500px]">{singleArticle.body}</p>
          <p>Article date: {formattedData}</p>
        </div>
      </div>
      <Vote singleArticle={singleArticle} article_id={article_id} />
      <Comments article_id={article_id} singleArticle={singleArticle}/>
    </>
  );
}

export default SingleArticle;
