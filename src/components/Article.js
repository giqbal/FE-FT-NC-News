import React, { Component } from 'react';
import * as api from '../api';

class Article extends Component {
    state = {
        article: {}
    }

    componentDidMount() {
        api.getArticleById(this.props.match.params.article_id)
            .then(({data: {article}}) => {
                this.setState({
                    article
                })
            })
    }

    render() {
        const article = this.state.article
        return (
            <section>
                <h2>{article.title}</h2>
                <h4>Posted in: {article.belongs_to}</h4>
                <p>{article.body}</p>
                <p>⬆️ {article.votes} ⬇️</p>
            </section>
        );
    }
}

export default Article;