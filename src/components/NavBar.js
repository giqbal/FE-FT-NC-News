import React, {Component} from 'react';
import UserSignIn from './UserSignIn';
import SearchBar from './SearchBar';
import NewArticleModal from './NewArticleModal';
import {Link} from 'react-router-dom';
import * as api from '../api';
import './NavBar.css';
import logo from '../logo.png';

class NavBar extends Component {
    state = {
        postArticleModalVisible: false,
        topics: [],
        articlesData: []
    }

    componentDidMount() {
        this.fetchTopics();
        this.fetchArticlesData();
    }

    render() {
        const {currentUser, login, logout} = this.props;
        const {postArticleModalVisible, topics, articlesData} = this.state;
        return (
            <div className='nav-bar'>
                {postArticleModalVisible && <NewArticleModal hidePostArticleModal={this.hidePostArticleModal} topics={topics} currentUser={currentUser}/>}
                <Link to='/'><img id='logo' src={logo} alt='website logo' /></Link>
                <SearchBar articles={articlesData} topics={topics}/>
                {currentUser.username && <p onClick={this.showPostArticleModal}>Post Article</p>}
                <UserSignIn currentUser={currentUser} login={login} logout={logout} />
            </div>
        );
    }

    showPostArticleModal = () => {
        this.setState({
          postArticleModalVisible: true
        })
    }
    
    hidePostArticleModal = () => {
        this.setState({
          postArticleModalVisible: false
        })
    }

    fetchTopics = () => {
        api.getTopics()
            .then(({data: {topics}}) => {
                this.setState({
                    topics
                })
            })
            .catch(console.log)
    }

    fetchArticlesData = () => {
        api.getArticles()
            .then(({data: {articles}}) => {
                const articlesData = articles.map(article => {
                    const {_id, title, body} = article;
                    return {_id, title, body};
                })
                this.setState({
                    articlesData
                })
        })
        .catch(console.log);
    }
}

export default NavBar;