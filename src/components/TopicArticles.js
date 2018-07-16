import React, { Component } from 'react';
import ArticleBox from './ArticleBox';
import {Redirect} from 'react-router-dom';
import * as api from '../api';

class TopicArticles extends Component {
    state = {
        articles: [],
        invalidTopic: false
    }

    componentDidMount() {
        this.fetchArticlesByTopic();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticlesByTopic();
    }

    render() {
        const slug = this.props.match.params.topicSlug
        const capitalisedTopic = slug[0].toUpperCase() + slug.slice(1)
        if (this.state.invalidTopic) return <Redirect to={{pathname: '/error/404', state: {from: 'topic'}}}/>
        else return (
            <div className='content'>
                <h2>{capitalisedTopic}</h2>
                {this.state.articles.map(article => <ArticleBox key={article._id} article={article}/>)}
            </div>
        );
    }

    fetchArticlesByTopic = () => {
        api.getArticlesByTopic(this.props.match.params.topicSlug)
            .then(({data: {articles}}) => {
                this.setState({
                    articles
                })
            })
            .catch(err => {
                this.setState({
                    invalidTopic: true
                })
            })
    }
}

export default TopicArticles;