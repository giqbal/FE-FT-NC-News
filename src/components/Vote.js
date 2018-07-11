import React from 'react';

const Vote = ({votes}) => {
    return <p><span role='img'>⬆️</span> {votes} <span role='img'>⬇️</span></p>
};

export default Vote;