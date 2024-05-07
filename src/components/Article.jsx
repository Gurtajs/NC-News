import { Link } from "react-router-dom";

function Article({articles}) {
    return (
        <ol>
			{articles.map((article) => {
				return (
					<Link to={`article/${article.article_id}`}>
					<li className="pt-10" key={article.article_id}>
					<h2 className="font-bold inline-break break-all w-100">{article.title}</h2>
						<div className="flex">
						<img src={article.article_img_url} alt="article image" width='300px' />
						<div className="flex flex-col gap-5 pl-10 pt-5">
						<p>{article.author}</p>
							<p>{article.topic}</p>
							<p>{article.votes} votes</p>
							<p>{article.comment_count} comments</p>
							<p>{article.created_at.slice(0,19).replace("T", " ")}</p>
						</div>
						</div>
					</li>
					</Link>
				)
			}) }
			</ol>
    )
}

export default Article