import axios from 'axios';
const apiUrl = 'https://northcoders-news-prod.herokuapp.com/api';

export const getArticles = () => {
    return axios.get(`${apiUrl}/articles`);
}

export const getArticlePageById = (id) => {
    return Promise.all([axios.get(`${apiUrl}/articles/${id}`), getCommentsforArticle(id)]);
}

export const getCommentsforArticle = (id) => {
    return axios.get(`${apiUrl}/articles/${id}/comments`);
}

export const getUserProfile = (username) => {
    return axios.get(`${apiUrl}/users/${username}`);
}

export const updateVoteCount = (id, vote, voteFor) => {
    return axios.put(`${apiUrl}/${voteFor}/${id}?vote=${vote}`);
}

export const getTopics = () => {
    return axios.get(`${apiUrl}/topics`);
}

export const getArticlesByTopic = (topicSlug) => {
    return axios.get(`${apiUrl}/topics/${topicSlug}/articles`);
}

export const deleteComment = (commentId) => {
    return axios.delete(`${apiUrl}/comments/${commentId}`);
}