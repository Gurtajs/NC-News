import axios from 'axios'

function getAllArticles() {
    return axios.get('https://news-project-1.onrender.com/api/articles').then((response)=> {
        return response.data.articles
    })
    .catch((error) => {
        console.log(error)
    })
}

function getArticleById(article_id) {
    return axios.get(`https://news-project-1.onrender.com/api/articles/${article_id}`).then((response) => {
        return response.data.article
    })
    .catch((error) => {
        console.log(error)
    })
}

function getComments(article_id) {
    return axios.get(`https://news-project-1.onrender.com/api/articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    })
    .catch((error) => {
        console.log(error)
    })
}

function upVote(article_id) {
    return axios.patch(`https://news-project-1.onrender.com/api/articles/${article_id}`, { inc_votes: 1 }).then((response) => {
        return response.data.article.votes
    })
}

function downVote(article_id) {
    return axios.patch(`https://news-project-1.onrender.com/api/articles/${article_id}`, { inc_votes: -1 }).then((response) => {
        return response.data.article.votes
    })
}





export {getAllArticles, getArticleById, getComments, upVote, downVote}