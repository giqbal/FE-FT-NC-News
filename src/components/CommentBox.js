import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const CommentBox = ({comment}) => {
    return (
        <div>
            <Link to={`/user/${comment.created_by}`}><h4>{comment.created_by}</h4></Link>
            <p>{moment(comment.created_at).fromNow()}</p>
            <p>{comment.body}</p>
            <p>⬆️ {comment.votes} ⬇️</p>
        </div>
    );
};

export default CommentBox;