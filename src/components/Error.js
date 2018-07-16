import React from 'react';

const Error = ({match: {params}, location}) => {
    if (params.statusCode === '404') return <p>Woops Error 404! I couldn't find the {location.state.from} you were looking for :'(</p>
};

export default Error;