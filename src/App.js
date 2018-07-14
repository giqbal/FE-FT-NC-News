import React, { Component } from 'react';
import ArticleList from './components/ArticleList'
import Article from './components/Article';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import TopicArticles from './components/TopicArticles';
import NewArticleModal from './components/NewArticleModal';
import {Route, Switch} from 'react-router-dom';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    articles: [],
    topics: [],
    currentUser: {},
    postArticleModalVisible: false
    }
  

  componentDidMount() {
    api.getArticles()
      .then(({data: {articles}}) => {
        this.setState({
          articles
        })
      })
      .catch(console.log);

    api.getTopics()
      .then(({data: {topics}}) => {
          this.setState({
              topics
          })
      })
      .catch(console.log)

    const currentUser = JSON.parse(localStorage.getItem('userLoggedIn'));
    if (currentUser) this.setState({currentUser});
    console.log(this.props)
  }

  render() {
    const {currentUser, postArticleModalVisible, articles, topics} = this.state;
    return (
      <div className='App'>
        {postArticleModalVisible && <NewArticleModal hidePostArticleModal={this.hidePostArticleModal} topics={topics} currentUser={currentUser}/>}
        <NavBar login={this.login} logout={this.logout} currentUser={currentUser} articles={articles} topics={topics} postArticleModal={this.handlePostArticle}/>
        <Switch>
          <Route path='/article/:article_id' render={(props) => <Article {...props} currentUser={currentUser}/>}/>
          <Route path='/user/:username' component={UserProfile}/>
          <Route path='/topic/:topicSlug' component={TopicArticles}/>
          <Route exact path='/' render={() => <ArticleList articles={articles}/>}/>
        </Switch>
      </div>
    );
  }

  login = (username) => {
    return api.getUserProfile(username)
        .then(({data: {user}}) => {
            if (user) {
              localStorage.setItem('userLoggedIn', JSON.stringify(user))
              this.setState({
                currentUser: user,
              });
            } else throw {message: 'Incorrect username'};
        })
  }

  logout = () => {
    localStorage.removeItem('userLoggedIn')
    this.setState({
        currentUser: {}
    })
  }

  handlePostArticle = () => {
    this.setState({
      postArticleModalVisible: true
    })
  }

  hidePostArticleModal = () => {
    this.setState({
      postArticleModalVisible: false
    })
  }
}

export default App;
