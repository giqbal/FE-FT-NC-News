import React, { Component } from 'react';
import ArticleBox from './components/ArticleBox';
import Article from './components/Article';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import {Route, Link} from 'react-router-dom';
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    api.getArticles()
      .then(({data: {articles}}) => {
        this.setState({
          articles
        })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div className='App'>
        <Link to='/'><h1>Northcoders News</h1></Link>
        <NavBar />
        <Route exact path='/' render={() => <Articles articles={this.state.articles}/>}/>
        <Route path='/article/:article_id' component={Article}/>
        <Route path='/user/:username' render={(props) => <UserProfile {...props} articles={this.state.articles}/>}/>
      </div>
    );
  }
}

function Articles({articles}) {
  return articles.map(article => <ArticleBox key={article._id} article={article} />)
}

export default App;
