import React from 'react';
import {Link} from 'react-router-dom';

const ArticleBox = ({article}) => {
    return (
        <div className='box content'>
            <Link to={`/article/${article._id}`}>
                <h3>{article.title}</h3>
                <span className='tag'>{article.belongs_to}</span>
                <p><span role='img' aria-label='comment count'>💬</span> {article.comments} Comments</p>
                <p>{article.votes} Votes</p>
            </Link>
        </div>
    );
};

export default ArticleBox;