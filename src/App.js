import React, { Component } from 'react';
import ArticleBox from './components/ArticleBox';
import Article from './components/Article';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import TopicArticles from './components/TopicArticles';
import NewArticleModal from './components/NewArticleModal';
import {Route} from 'react-router-dom';
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
  }

  render() {
    const {currentUser, postArticleModalVisible, articles, topics} = this.state;
    return (
      <div className='App'>
        {postArticleModalVisible && <NewArticleModal hidePostArticleModal={this.hidePostArticleModal} topics={topics} currentUser={currentUser}/>}
        <NavBar login={this.login} logout={this.logout} currentUser={currentUser} articles={articles} topics={topics} postArticleModal={this.handlePostArticle}/>
        <Route exact path='/' render={() => <Articles articles={articles} updateArticleVote={this.updateArticleVote}/>}/>
        <Route path='/article/:article_id' render={(props) => <Article {...props} currentUser={currentUser}/>}/>
        <Route path='/user/:username' render={(props) => <UserProfile {...props} articles={articles}/>}/>
        <Route path='/topic/:topicSlug' render={(props) => <TopicArticles {...props}/>}/>
      </div>
    );
  }

  updateArticleVote = (articleId, vote) => {
    this.state.currentUser.username && api.updateVoteCount(articleId, vote, 'articles')
        .then(({data: {article}}) => {
          const updatedArticles = this.state.articles.map((existingArticle) => {
            return article._id === existingArticle._id? {...existingArticle, votes: article.votes}: existingArticle
          });
          this.setState({
              articles: updatedArticles
          })
        })
        .catch(console.log)
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

function Articles({articles, updateArticleVote}) {
  return articles.map(article => <ArticleBox key={article._id} article={article} updateArticleVote={updateArticleVote}/>)
}

export default App;
