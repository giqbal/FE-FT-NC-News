import React, {Component} from 'react';
import ArticleBox from './ArticleBox';
import * as api from '../api';

class ArticleList extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        this.fetchArticles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticles();
    } 

    render() {
        return (
            <div className='section'>
                {this.state.articles.map(article => <ArticleBox key={article._id} article={article}/>)}
            </div>
        )
    }
    
    fetchArticles = () => {
        api.getArticles()
            .then(({data: {articles}}) => {
                this.setState({
                    articles
                })
        })
        .catch(console.log);
    }
};

export default ArticleList;