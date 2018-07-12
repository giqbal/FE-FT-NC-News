import React from 'react';
import UserSignIn from './UserSignIn';
import SearchBar from './SearchBar';

const NavBar = ({currentUser, login, logout, articles, topics}) => {
    return (
        <div>
            <a href='http://localhost:3000/'><h1>Northcoders News</h1></a>
            <SearchBar articles={articles} topics={topics} />
            <UserSignIn currentUser={currentUser} login={login} logout={logout} />
        </div>
    );
}

export default NavBar;