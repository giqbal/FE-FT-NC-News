import axios from 'axios';

export const getArticles = () => {
    return axios.get('https://northcoders-news-prod.herokuapp.com/api/articles');
}

export const getArticlePageById = (id) => {
    return Promise.all([axios.get(`https://northcoders-news-prod.herokuapp.com/api/articles/${id}`), getCommentsforArticle(id)]);
}

export const getCommentsforArticle = (id) => {
    return axios.get(`https://northcoders-news-prod.herokuapp.com/api/articles/${id}/comments`);
}

export const getUserProfile = (username) => {
    return axios.get(`https://northcoders-news-prod.herokuapp.com/api/users/${username}`);
}

export const updateVoteCount = (id, vote, voteFor) => {
    return axios.put(`https://northcoders-news-prod.herokuapp.com/api/${voteFor}/${id}?vote=${vote}`);
}