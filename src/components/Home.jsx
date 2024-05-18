import { useState, useEffect } from "react";
import { getAllArticles, getTopics } from "../../api";
import Article from "./Article";
import Topics from "./Topics";
import SortArticles from "./SortArticles";
import PostArticle from "./PostArticle";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <section>
      <h1 className="pt-5 pb-3 text-3xl">Available articles</h1>
      <SortArticles articles={articles} setArticles={setArticles} />
      <Topics />
      <PostArticle articles={articles} setArticles={setArticles}/>
      <Article articles={articles} />
    </section>
  );
}

export default Home;
