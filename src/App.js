import React, { Component } from 'react';
import ArticleBox from './components/ArticleBox';
import Article from './components/Article';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import TopicArticles from './components/TopicArticles';
import {Route} from 'react-router-dom';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    articles: [],
    topics: [],
    currentUser: {
      _id: "5b2fd6a218d352ff5dd978c8",
      username: "weegembump",
      name: "Gemma Bump",
      avatar_url: "http://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg",
      __v: 0
    }
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
  }

  render() {
    return (
      <div className='App'>
        <NavBar articles={this.state.articles} topics={this.state.topics}/>
        <Route exact path='/' render={() => <Articles articles={this.state.articles} updateArticleVote={this.updateArticleVote}/>}/>
        <Route path='/article/:article_id' component={Article}/>
        <Route path='/user/:username' render={(props) => <UserProfile {...props} articles={this.state.articles}/>}/>
        <Route path='/topic/:topicSlug' render={(props) => <TopicArticles {...props}/>}/>
      </div>
    );
  }

  updateArticleVote = (articleId, vote) => {
    api.updateVoteCount(articleId, vote, 'articles')
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
}

function Articles({articles, updateArticleVote}) {
  return articles.map(article => <ArticleBox key={article._id} article={article} updateArticleVote={updateArticleVote}/>)
}

export default App;
