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
        this.fetchArticle();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticle();
    }

    render() {
        const article = this.state.article
        return (
            <section>
                <h2>{article.title}</h2>
                <h4>Posted in: {article.belongs_to}</h4>
                <h4>Article by: <Link to={`/user/${article.created_by}`}>{article.created_by}</Link></h4>
                <p>{article.body}</p>
                <Vote votes={article.votes} updateVote={this.updateArticleVote}/>
                <p>----------💬----------</p>
                {this.state.comments.map(comment => <CommentBox key={comment._id} comment={comment} updateCommentVote={this.updateCommentVote}/>)}
            </section>
        );
    }

    updateArticleVote = (vote) => {
        api.updateVoteCount(this.state.article._id, vote, 'articles')
            .then(({data: {article}}) => {
                this.setState({
                    article
                })
            })
            .catch(console.log)
    }

    updateCommentVote = (commentId, vote) => {
        api.updateVoteCount(commentId, vote, 'comments')
            .then(({data: {comment}}) => {
                const updatedComments = this.state.comments.map((existingComment) => comment._id === existingComment._id? comment: existingComment);
                this.setState({
                    comments: updatedComments
                })
            })
    }

    fetchArticle = () => {
        api.getArticlePageById(this.props.match.params.article_id)
            .then(([{data: {article}}, {data: {comments}}]) => {
                this.setState({
                    article,
                    comments
                })
            })
            .catch(console.log)
    }
}

export default Article;