import React, {Component} from 'react';
import ArticleBox from './ArticleBox';
import {Redirect} from 'react-router-dom';
import * as api from '../api';

class ArticleList extends Component {
    state = {
        articles: [],
        fetchArticlesFailed: false
    }

    componentDidMount() {
        this.fetchArticles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticles();
    } 

    render() {
        if (this.state.fetchArticlesFailed) return <Redirect to='/error/500'/>
        else return (this.state.articles.length? 
            <div className='section'>
                {this.state.articles.map(article => <ArticleBox key={article._id} article={article}/>)}
            </div> :
            <span class="icon">
                <i class="fas fa-spinner fa-pulse"></i>
            </span>
        )
    }
    
    fetchArticles = () => {
        api.getArticles()
            .then(({data: {articles}}) => {
                this.setState({
                    articles
                })
        })
        .catch(err => {
            this.setState({
                fetchArticlesFailed: true
            })
        });
    }
};

export default ArticleList;