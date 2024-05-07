import axios from 'axios'

function getAllArticles() {
    return axios.get('https://news-project-1.onrender.com/api/articles').then((response)=> {
        return response.data.articles
    })
    .catch((error) => {
        console.log(error)
    })
}

export {getAllArticles}