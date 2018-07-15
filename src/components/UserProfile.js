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
                 <div className='card'>
                    <div className='card-image'>
                        <figure className='image is-square'>
                            <img src={user.avatar_url} alt='User avatar'/>
                        </figure>    
                    </div>
                    <div className='card-content'>
                        <p className='title is-4'>{user.name}</p>
                        <p className='title is-6'>@{user.username}</p>
                    </div>
                </div>
                {userArticles.map(article => <ArticleBox key={article._id} article={article}/>)}
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