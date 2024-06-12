import { useState } from "react";
import { postArticle } from "../../api";

function PostArticle({ articles, setArticles }) {
  const [articleForm, setArticleForm] = useState(false);
  const [author, setAuthor] = useState("tickle122");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("coding");
  const [article_img_url, setArticle_img_url] = useState("");
 
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [titleBodyError, setTitleBodyError] = useState("");

  const showArticleForm = () => {
    setArticleForm(!articleForm);
    setTitleBodyError("");
    setTitleError("");
    setBodyError("");
  };

  const handleArticleSubmit = (e) => {
    setTitleBodyError("");
    setTitleError("");
    setBodyError("");
    e.preventDefault();

    if (title.length === 0 && body.length === 0) {
      setTitleBodyError("Enter a title and a body");
    } else if (title.length === 0) {
      setTitleError("Enter a title");
    } else if (body.length === 0) {
      setBodyError("Enter a body");
    } else {
      postArticle(author, title, body, topic, article_img_url).then((data) => {
        setArticles([data, ...articles]);
        setArticleForm(false);
        setTitle("");
        setBody("");
        setTopic("");
        setArticle_img_url("");
      });
    }
  };

  return (
    <>
      <h1>Got a story that will captivate our readers?</h1>
      <button
        className="mt-3 border-2 border-black rounded-lg p-1 translate-y-[-10px]"
        onClick={showArticleForm}
      >
        Post Article
      </button>
      {articleForm ? (
        <form>
          <h1>
            Signed in as: <span className="text-orange-500">tickle122</span>
          </h1>
          <div className="flex flex-col gap-1 md:block">
          <label className="mr-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder=" enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 rounded-sm mr-4 mb-2"
          />
          <label className="mr-2" htmlFor="body">
            Body
          </label>
          <input
            id="body"
            type="text"
            placeholder=" enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border-2 border-gray-500 rounded-sm mr-4"
          />
          <label className="mr-2" htmlFor="topic">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-2 border-gray-500 rounded-sm mr-4 mb-2"
          >
            <option value="coding">Coding</option>
            <option value="football">Football</option>
            <option value="cooking">Cooking</option>
          </select>
          <label className="mr-2" htmlFor="article_img_url">
            Article image url
          </label>
          <input
            id="article_img_url"
            type="text"
            placeholder=" add image"
            value={article_img_url}
            onChange={(e) => setArticle_img_url(e.target.value)}
            className="border-2 border-gray-500 rounded-sm mr-4 mt-2"
          />
          <input
            className="border-2 border-black rounded-md p-1 cursor-pointer w-[100px] h-[40px]"
            type="submit"
            onClick={handleArticleSubmit}
          />
          </div>
        </form>
      ) : null}
     
      {titleError && <p className="text-red-500">{titleError}</p>}
      {bodyError && <p className="text-red-500">{bodyError}</p>}
      {titleBodyError && <p className="text-red-500">{titleBodyError}</p>}
    </>
  );
}

export default PostArticle;
