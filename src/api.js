import axios from 'axios';

export const getArticles = () => {
    return axios.get('https://northcoders-news-prod.herokuapp.com/api/articles');
}

export const getArticleById = (id) => {
    return axios.get(`https://northcoders-news-prod.herokuapp.com/api/articles/${id}`);
}