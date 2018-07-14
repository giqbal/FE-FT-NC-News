import React from 'react';
import ArticleBox from './ArticleBox';

const ArticleList = ({articles, updateArticleVote}) => {
    return articles.map(article => <ArticleBox key={article._id} article={article}/>)
};

export default ArticleList;