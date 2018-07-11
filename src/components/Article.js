import React, { Component } from 'react';
import CommentBox from './CommentBox';
import * as api from '../api';

class Article extends Component {
    state = {
        article: {},
        comments: []
    }

    componentDidMount() {
        api.getArticlePageById(this.props.match.params.article_id)
            .then(([{data: {article}}, {data: {comments}}]) => {
                this.setState({
                    article,
                    comments
                })
            })
            .catch(console.log)
    }

    render() {
        const article = this.state.article
        return (
            <section>
                <h2>{article.title}</h2>
                <h4>Posted in: {article.belongs_to}</h4>
                <p>{article.body}</p>
                <p>⬆️ {article.votes} ⬇️</p>
                <p>----------💬----------</p>
                {this.state.comments.map(comment => <CommentBox key={comment._id} comment={comment} />)}
            </section>
        );
    }
}

export default Article;