import React from 'react';
//Need to add upvote and downvote functionality
const Vote = ({votes, updateVote}) => {
    return <p><span role='img' onClick={() => updateVote('up')} >⬆️</span> {votes} <span role='img' onClick={() => updateVote('down')}>⬇️</span></p>
};

export default Vote;