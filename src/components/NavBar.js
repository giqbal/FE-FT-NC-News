import React, {Component} from 'react';
import UserSignIn from './UserSignIn';
import SearchBar from './SearchBar';
import NewArticleModal from './NewArticleModal';
import UserContext from '../userContext';
import {Link, Redirect} from 'react-router-dom';
import * as api from '../api';
import logo from '../logo.png';

class NavBar extends Component {
    state = {
        postArticleModalVisible: false,
        topics: [],
        articlesData: [],
        enableNavbarBurger: false,
        fetchDataFailed: false
    }

    componentDidMount() {
        this.fetchTopics();
        this.fetchArticlesData();
    }

    render() {
        const {login, logout} = this.props;
        const {postArticleModalVisible, topics, articlesData, enableNavbarBurger, fetchDataFailed} = this.state;
        if (fetchDataFailed) return <Redirect to='/error/500' />
        else return (
            <nav className='navbar is-warning'>
                {postArticleModalVisible && <NewArticleModal enableModal={postArticleModalVisible} hidePostArticleModal={this.hidePostArticleModal} topics={topics}/>}
                <div className='navbar-brand'>
                    <div className="navbar-item">
                        <Link to='/'>
                            <img id='logo' src={logo} alt='website logo' />
                        </Link>
                    </div>
                    <a role="button" className={enableNavbarBurger? 'navbar-burger is-active': 'navbar-burger'} onClick={this.toggleNavbarBurger} aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <SearchBar articles={articlesData} topics={topics}/>
                <div className={enableNavbarBurger? 'navbar-menu is-active': 'navbar-menu'}>
                    <div className='navbar-end'>
                        <UserContext.Consumer>
                            {currentUser => currentUser.username && <a className='navbar-item' onClick={this.showPostArticleModal}>Post Article</a>}
                        </UserContext.Consumer>
                        <UserSignIn login={login} logout={logout} />
                    </div>
                    
                </div>
            </nav>
        );
    }

    toggleNavbarBurger = () => {
        this.setState({
            enableNavbarBurger: this.state.enableNavbarBurger? false : true
        })
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
            .catch(err => {
                this.setState({
                    fetchDataFailed: true
                })
            })
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
        .catch(err => {
            this.setState({
                fetchDataFailed: true
            })
        })
    }
}

export default NavBar;