import React, { Component } from 'react';
import CommentBox from './CommentBox';
import Vote from "./Vote";
import {Link} from 'react-router-dom';
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
                <h4>Article by: <Link to={`/user/${article.created_by}`}>{article.created_by}</Link></h4>
                <p>{article.body}</p>
                <Vote votes={article.votes}/>
                <p>----------💬----------</p>
                {this.state.comments.map(comment => <CommentBox key={comment._id} comment={comment} />)}
            </section>
        );
    }
}

export default Article;