import React from 'react';
import moment from 'moment';
import Vote from './Vote';
import UserContext from '../userContext';
import {Link} from 'react-router-dom';

const CommentBox = ({comment, updateCommentVote, deleteComment}) => {
    return (
        <div className='box'>
            <UserContext.Consumer>
                {currentUser => currentUser.username === comment.created_by && <span onClick={() => deleteComment(comment._id)}>ⓧ</span>}
            </UserContext.Consumer>
            <Link to={`/user/${comment.created_by}`}><h4>{comment.created_by}</h4></Link>
            <p>{moment(comment.created_at).fromNow()}</p>
            <p>{comment.body}</p>
            <UserContext.Consumer>
                {user => <Vote votes={comment.votes} updateVote={(vote) => updateCommentVote(user, comment._id, vote)}/>}
            </UserContext.Consumer>
        </div>
    );
};

export default CommentBox;