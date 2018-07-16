import React from 'react';

const Error = ({match: {params}, location}) => {
    if (params.statusCode === '404') return <p>Woops Error 404! I couldn't find the {location.state.from} you were {location.state.from === 'comment'? 'deleting or voting for':'looking for'} :'(</p>
    if (params.statusCode === '500') return <p>Woops! Something went terribly wrong. Please try again later</p>
};

export default Error;