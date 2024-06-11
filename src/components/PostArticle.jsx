import { useState } from "react";
import { postArticle } from "../../api";

function PostArticle({ articles, setArticles }) {
  const [articleForm, setArticleForm] = useState(false);
  const [author, setAuthor] = useState("tickle122");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [article_img_url, setArticle_img_url] = useState("");
  const [error, setError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [topicError, setTopicError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [titleBodyError, setTitleBodyError] = useState("");
  const validAuthors = [
    "grumpy19",
    "tickle122",
    "happyamy2016",
    "cooljmessy",
    "weegembump",
    "jessjelly",
  ];
  const validTopics = ["coding", "football", "cooking"];
  const showArticleForm = () => {
    setArticleForm(!articleForm);
  };

  const handleArticleSubmit = (e) => {
    setError("");
    setAuthorError("");
    setTopicError("");
    setTitleBodyError("");
    setTitleError("");
    setBodyError("");
    e.preventDefault();
    if (!validAuthors.includes(author) && !validTopics.includes(topic)) {
      setError("Enter an existing author name and a valid topic");
    } else if (!validAuthors.includes(author)) {
      setAuthorError("Enter an existing author name");
    } else if (!validTopics.includes(topic)) {
      setTopicError("Enter a valid topic");
    }
    if (title.length === 0 && body.length === 0) {
      setTitleBodyError("Enter a title and a body");
    } else if (title.length === 0) {
      setTitleError("Enter a title");
    } else if (body.length === 0) {
      setBodyError("Enter a body");
    }

    postArticle(author, title, body, topic, article_img_url).then((data) => {
      console.log(data);
      setArticles([data, ...articles]);
    });
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
      {error && <p className="text-red-500">{error}</p>}
      {authorError && <p className="text-red-500">{authorError}</p>}
      {topicError && <p className="text-red-500">{topicError}</p>}
      {titleError && <p className="text-red-500">{titleError}</p>}
      {bodyError && <p className="text-red-500">{bodyError}</p>}
      {titleBodyError && <p className="text-red-500">{titleBodyError}</p>}
    </>
  );
}

export default PostArticle;
