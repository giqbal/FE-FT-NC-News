import React from 'react';
import moment from 'moment'

const CommentBox = ({comment}) => {
    return (
        <div>
            <h4>{comment.created_by}</h4>
            <p>{moment(comment.created_at).fromNow()}</p>
            <p>{comment.body}</p>
            <p>⬆️ {comment.votes} ⬇️</p>
        </div>
    );
};

export default CommentBox;