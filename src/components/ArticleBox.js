import React from 'react';
import {Link} from 'react-router-dom';

const ArticleBox = ({article}) => {
    return (
        <div className='box content container'>
            <Link to={`/article/${article._id}`}>
                <h3>{article.title}</h3>
                <span className='tag'>{article.belongs_to}</span>
                <div className='level'>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className="heading">Comments</p>
                            <p className="title">{article.comments}</p>
                        </div>
                    </div>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className="heading">Votes</p>
                            <p className="title">{article.votes}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ArticleBox;