import React, { Component } from 'react';
import * as api from '../api';
import ArticleBox from './ArticleBox';

class UserProfile extends Component {
    state = {
        user: {},
        userArticles: []
    }
    componentDidMount() {
        this.fetchUserProfileData(this.props.match.params.username)
    }
    render() {
        const {user, userArticles} = this.state
        
        return (
            <div>
                 <div>
                    <figure className='image is-128x128'>
                        <img src={user.avatar_url} alt='User avatar'/>
                    </figure>
                    <h2>Username: {user.username}</h2>
                    <h4>Name: {user.name}</h4>
                </div>
                <div>
                    {userArticles.map(article => <ArticleBox key={article._id} article={article}/>)}
                </div>
            </div>
        );
    }

    fetchUserProfileData = (username) => {
        api.getUserProfile(username)
            .then(({data: {user}}) => {
                return Promise.all([user, api.getArticles()])
            })
            .then(([user, {data: {articles}}]) => {
                this.setState({
                    user,
                    userArticles: articles.filter(article => article.created_by === user.username)
                })
            })
            .catch(console.log)
    }
}

export default UserProfile;