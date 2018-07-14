import React from 'react';
import UserSignIn from './UserSignIn';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';

const NavBar = ({currentUser, login, logout, articles, topics, postArticleModal}) => {
    return (
        <div>
            <Link to='/'><h1>Northcoders News</h1></Link>
            <SearchBar articles={articles} topics={topics}/>
            <UserSignIn currentUser={currentUser} login={login} logout={logout} />
            {currentUser.username && <p onClick={postArticleModal}>Post Article</p>}
        </div>
    );
}

export default NavBar;