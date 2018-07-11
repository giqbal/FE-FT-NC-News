import React, { Component } from 'react';
import * as api from '../api';
import ArticleBox from './ArticleBox';

class UserProfile extends Component {
    state = {
        userProfile:{}
    }
    componentDidMount() {
        api.getUserProfile(this.props.match.params.username)
            .then(({data: {user}}) => {
                this.setState({
                    userProfile: user
                })
            })
    }
    render() {
        const user = this.state.userProfile
        
        return (
            <div>
                 <div>
                    <img src={user.avatar_url} alt='User avatar'/>
                    <h2>{user.username}</h2>
                    <h4>{user.name}</h4>
                </div>
                <p>---------------------</p>
                <div>
                    {this.props.articles.reduce((acc, article) => {
                        if (article.created_by === user.username) return acc.concat(<ArticleBox key={article._id} article={article}/>);
                        return acc;
                    }, [])}
                </div>
            </div>
        );
    }
}

export default UserProfile;