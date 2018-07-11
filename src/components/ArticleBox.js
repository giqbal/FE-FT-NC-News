import React from 'react';
import {Link} from 'react-router-dom'

const ArticleBox = ({article}) => {
    return (
        <Link to={`/article/${article._id}`}>
            <h3>{article.title}</h3>
            <h4>Posted in: {article.belongs_to}</h4>
            <p>💬 {article.comments} Comments</p>
            <p>⬆️ {article.votes} ⬇️</p>
        </Link>
    );
};

export default ArticleBox;