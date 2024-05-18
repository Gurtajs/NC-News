import { useState } from "react";
import { postArticle } from "../../api";

function PostArticle({articles, setArticles}) {
  const [articleForm, setArticleForm] = useState(false);
	const [author, setAuthor] = useState('')
	const [title, setTitle] =useState('')
	const [body, setBody] = useState('')
	const [topic, setTopic] = useState('')
	const [article_img_url, setArticle_img_url] = useState('')

	const showArticleForm = () => {
		setArticleForm(!articleForm)
	}

	const handleArticleSubmit = (e) => {
		e.preventDefault()
		postArticle(author, title, body, topic, article_img_url).then((data) => {
			console.log(data)
			setArticles([data, ...articles])
		})
	}

  return (
    <>
      <button
        className="border-2 border-black rounded-lg p-1 translate-y-[-10px]"
        onClick={showArticleForm}
      >
        Post Article
      </button>
      
      {articleForm ? (
        <form>
          <label className="mr-2" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="author name"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />

          <label className="mr-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

<label className="mr-2" htmlFor="body">
            Body
          </label>
          <input
            id="body"
            type="text"
            placeholder="enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

<label className="mr-2" htmlFor="topic">
            Topic
          </label>
          <input
            id="topic"
            type="text"
            placeholder="enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

<label className="mr-2" htmlFor="article_img_url">
            Article image url
          </label>
          <input
            id="article_img_url"
            type="text"
            placeholder="Add image"
            value={article_img_url}
            onChange={(e) => setArticle_img_url(e.target.value)}
          />

          <input
            className="border-2 border-black rounded-md p-1 cursor-pointer"
            type="submit"
            onClick={handleArticleSubmit}
          />
        </form>
      ) : null}
    </>
  );
}

export default PostArticle;
