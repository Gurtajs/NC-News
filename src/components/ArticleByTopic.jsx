import { useState } from "react"
import { useEffect } from "react"
import { getArtibleByTopic } from "../../api"
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";


function ArticleByTopic() {

const [articlesByTopic, setArticlesByTopic] = useState([])
const {topic} = useParams()

	useEffect(() => {
		getArtibleByTopic(topic).then((data) => {
			setArticlesByTopic(data)
			console.log(data)
		})
	}, [])

	return(
		<>
		<h1 className="pt-5">{topic[0].toUpperCase()+topic.slice(1)} related articles</h1>
		{articlesByTopic.map((articleByTopic) => {
			return (
					<li className="pt-10 list-none" key={articleByTopic.article_id}>
					<h2 className="font-bold inline-break break-all w-100">{articleByTopic.title}</h2>
						<div className="flex">
						<img src={articleByTopic.article_img_url} alt="article image" width='300px' />
						<div className="flex flex-col gap-5 pl-10 pt-5">
						<div className="flex items-center gap-2"><div><FaUser /></div><p>{articleByTopic.author}</p></div>
							<p>Topic: {articleByTopic.topic}</p>
							<p>{articleByTopic.votes} Likes</p>
							<p>{articleByTopic.comment_count} comments</p>
							<p>Article date: {articleByTopic.created_at.slice(0,19).replace("T", " ")}</p>
						</div>
						</div>
					</li>
			)
		})}
		</>
	)
}

export default ArticleByTopic