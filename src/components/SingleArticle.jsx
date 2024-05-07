import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";

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
		return <><h2>Loading...</h2></>
		}
	
	const formattedData = singleArticle.created_at.slice(0, 19).replace("T", " ")
	
	console.log(loading)

  return (
    <>
      <h2 className="font-bold inline-break break-all w-100">
        {singleArticle.title}
      </h2>
      <div className="flex">
        <img src={singleArticle.article_img_url} alt="article image" width="300px" />
        <div className="flex flex-col gap-5 pl-10 pt-5">
					<p>{singleArticle.author}</p>
          <p>{singleArticle.topic}</p>
          <p>{singleArticle.votes} votes</p>
          <p>{singleArticle.comment_count} comments</p>
          <p>{formattedData}</p>
        </div>
      </div>
    </>
  );
}

export default SingleArticle;
