import React, { Component } from 'react';
import ArticleList from './components/ArticleList'
import Article from './components/Article';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import TopicArticles from './components/TopicArticles';
import Error from './components/Error';
import {Route, Switch} from 'react-router-dom';
import UserContext from './userContext'
import * as api from './api';
import './App.css';

class App extends Component {
  state = {
    currentUser: {}
    }
  

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('userLoggedIn'));
    if (currentUser) this.setState({currentUser});
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div className='App'>
        <UserContext.Provider value={currentUser}>
          <NavBar login={this.login} logout={this.logout}/>
          <Switch>
            <Route path='/article/:article_id' component={Article}/>
            <Route path='/user/:username' component={UserProfile}/>
            <Route path='/topic/:topicSlug' component={TopicArticles}/>
            <Route path='/error/:statusCode' component={Error}/>
            <Route exact path='/' component={ArticleList} />
          </Switch>
        </UserContext.Provider>
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
            }
        });
  }

  logout = () => {
    localStorage.removeItem('userLoggedIn')
    this.setState({
        currentUser: {}
    })
  }
}

export default App;
