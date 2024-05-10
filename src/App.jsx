import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import SingleArticle from './components/SingleArticle'
import Topic from './components/Topics'
import ArticleByTopic from './components/ArticleByTopic'

function App() {

  return (
    <div className='pl-5'>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/article/:article_id" element={<SingleArticle/>} />
      <Route path="/article/topic/:topic" element={<ArticleByTopic/>}/>
      </Routes>
    </div>
  )
}

export default App
