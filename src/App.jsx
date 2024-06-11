import "./App.css";
import {useState, useEffect} from "react"
import { getAllArticles} from "../api";

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
// import ArticleByTopic from "./components/ArticleByTopic";
import ErrorPage from "./components/ErrorPage";
import SortArticlesByTopic from "./components/SortArticlesByTopic";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pb-10 text-base sm:text-xl">
        <Header />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Home articles={articles} setArticles={setArticles} loading={loading} setLoading={setLoading}/> } />
          <Route path="/article/:article_id" element={<SingleArticle />} />
          <Route path="/articles/topic/:topic" element={<SortArticlesByTopic articles={articles} setArticles={setArticles}/>} />
          <Route path="/articles/topic/:topic/article/:article_id" element={<SingleArticle />} />
        </Routes>
    </div>
  );
}

export default App;
