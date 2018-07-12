import React from 'react';
import moment from 'moment';
import Vote from './Vote';
import {Link} from 'react-router-dom';

const CommentBox = ({comment, updateCommentVote}) => {
    return (
        <div>
            <Link to={`/user/${comment.created_by}`}><h4>{comment.created_by}</h4></Link>
            <p>{moment(comment.created_at).fromNow()}</p>
            <p>{comment.body}</p>
            <Vote votes={comment.votes} updateVote={(vote) => updateCommentVote(comment._id, vote)}/>
        </div>
    );
};

export default CommentBox;