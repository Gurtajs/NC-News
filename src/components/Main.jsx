import { useState, useEffect } from "react";
import { getAllArticles } from "../../api";

function Main() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  return (
		<section>
			<h1 className="pt-10 text-3xl">Available articles</h1>
			<ol>
			{articles.map((article) => {
				return (
					<li className="pt-10" key={article.article_id}>
					<h2 className="font-bold inline-break break-all w-100">{article.title}</h2>
						<div className="flex">
						<img src={article.article_img_url} alt="article image" width='300px' />
						<div className="flex flex-col gap-5 pl-10 pt-5">
							<p>Topic: {article.topic}</p>
							<p>Votes: {article.votes}</p>
							<p>{article.created_at.slice(0,19).replace("T", " ")}</p>
							<p>Comments: {article.comment_count}</p>
						</div>
						</div>
					</li>
				)
			}) }
			</ol>
		</section>


	)
}

export default Main;
