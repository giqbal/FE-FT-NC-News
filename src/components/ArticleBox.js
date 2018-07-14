import React from 'react';
import {Link} from 'react-router-dom'
import './ArticleBox.css';

const ArticleBox = ({article}) => {
    return (
        <div className='article-box'>
            <Link to={`/article/${article._id}`}>
                <h3>{article.title}</h3>
                <h4>Posted in: {article.belongs_to}</h4>
                <p>💬 {article.comments} Comments</p>
                <p>{article.votes} Votes</p>
            </Link>
        </div>
    );
};

export default ArticleBox;