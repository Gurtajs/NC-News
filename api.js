import axios from "axios";

function getAllArticles() {
  return axios
    .get("https://news-project-1.onrender.com/api/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getArticleById(article_id) {
  return axios
    .get(`https://news-project-1.onrender.com/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getComments(article_id) {
  return axios
    .get(
      `https://news-project-1.onrender.com/api/articles/${article_id}/comments`
    )
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.log(error);
    });
}

function upVote(article_id) {
  return axios
    .patch(`https://news-project-1.onrender.com/api/articles/${article_id}`, {
      inc_votes: 1,
    })
    .then((response) => {
      return response.data.article.votes;
    });
}

function downVote(article_id) {
  return axios
    .patch(`https://news-project-1.onrender.com/api/articles/${article_id}`, {
      inc_votes: -1,
    })
    .then((response) => {
      return response.data.article.votes;
    });
}

function postComment(article_id, username, body) {
  return axios
    .post(
      `https://news-project-1.onrender.com/api/articles/${article_id}/comments`,
      { username, body })
      .then((response) => {
        return response.data.comment
      })
}

function deleteComment(comment_id) {
  return axios.delete(`https://news-project-1.onrender.com/api/comments/${comment_id}`)
}

function getTopics() {
  return axios.get(`https://news-project-1.onrender.com/api/topics`).then((response) => {
    return response.data.topics
  })
  .catch((error) => {
    console.log(error);
  });
}

function getArticleByTopic(topic) {
  return axios.get(`https://news-project-1.onrender.com/api/articles?topic=${topic}`).then((response) => {
    return response.data.articles
  })
  .catch((error) => {
    console.log(error);
  });
}

function sortArticles(sortBy, orderBy) {
  return axios.get(`https://news-project-1.onrender.com/api/articles?sort_by=${sortBy}&order_by=${orderBy}`).then((response) => {
    return response.data.articles
  })
  .catch((error) => {
    console.log(error)
  })
}




export {
  getAllArticles,
  getArticleById,
  getComments,
  upVote,
  downVote,
  postComment,
  deleteComment,
  getTopics,
  getArticleByTopic,
  sortArticles
};
