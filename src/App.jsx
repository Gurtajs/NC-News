import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import ArticleByTopic from "./components/ArticleByTopic";
import ErrorPage from "./components/ErrorPage";
import User from "./components/User";

function App() {
  return (
    <div className="pl-5">
      <div className="flex">
        <div className="mr-[100px]">
          <Header />
        </div>
        <div className="flex items-center mr-[100px]">
          <User />
        </div>
      </div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<SingleArticle />} />
        <Route path="/article/topic/:topic" element={<ArticleByTopic />} />
      </Routes>
    </div>
  );
}

export default App;
