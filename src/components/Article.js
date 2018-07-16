import React, { Component } from 'react';
import CommentBox from './CommentBox';
import Vote from "./Vote";
import {Link, Redirect} from 'react-router-dom';
import * as api from '../api';

class Article extends Component {
    state = {
        article: {},
        comments: [],
        commentInput: '',
        invalidUrl: false,
        invalidPost: false
    }

    componentDidMount() {
        this.fetchArticle();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticle();
    }

    render() {
        const {article, commentInput, comments, invalidUrl, invalidPost} = this.state
        const {currentUser} = this.props;
        const sortedCommentsByTime = [...comments].sort((a, b) => b.created_at - a.created_at);
        if (invalidUrl) return <Redirect to={{pathname: '/error/404', state:{from: 'article'}}}/>
        else return (
            <div className='section'>
                <section className='content container box'>
                    <h2>{article.title}</h2>
                    <h4><Link to={`/user/${article.created_by}`}>{article.created_by}</Link></h4>
                    <span className='tag'><Link to={`/topic/${article.belongs_to}`}>{article.belongs_to}</Link></span>
                    <p>{article.body}</p>
                    <Vote votes={article.votes} updateVote={this.updateArticleVote}/>
                </section>
                <div className='field box'>
                    <p>----------<span role='img' aria-label='comment'>💬</span>----------</p>
                    {currentUser.username && <textarea className='textarea' type='text' placeholder='Comment...' onChange={this.handleCommentInput} value={commentInput}/>}
                    {currentUser.username && <a className='button' onClick={() => this.postComment(commentInput)}>Share your thoughts</a>}
                    {invalidPost && <p>Can't post an empty comment</p>}  
                </div>
                {sortedCommentsByTime.map(comment => <CommentBox key={comment._id} deleteComment={this.deleteComment} currentUser={currentUser} comment={comment} updateCommentVote={this.updateCommentVote}/>)}
            </div>
        );
    }

    updateArticleVote = (vote) => {
        this.props.currentUser.username && api.updateVoteCount(this.state.article._id, vote, 'articles')
            .then(({data: {article}}) => {
                this.setState({
                    article
                })
            })
            .catch(console.log)
    }

    updateCommentVote = (commentId, vote) => {
        this.props.currentUser.username && api.updateVoteCount(commentId, vote, 'comments')
            .then(({data: {comment}}) => {
                const updatedComments = this.state.comments.map((existingComment) => comment._id === existingComment._id? comment: existingComment);
                this.setState({
                    comments: updatedComments
                })
            })
            .catch(console.log)
    }

    deleteComment = (commentId) => {
        api.deleteComment(commentId)
            .then(({status}) => {
                if (status === 204) {
                    const updatedComments = this.state.comments.filter(comment => comment._id !== commentId);
                    this.setState({
                        comments: updatedComments
                    })
                }
            })
            .catch(console.log)
    }

    postComment = (commentBody) => {
        api.postComment(this.state.article._id, commentBody, this.props.currentUser._id)
            .then(({status}) => {
                if (status === 201) {
                    return api.getCommentsforArticle(this.state.article._id)
                }
            })
            .then(({data: {comments}}) => {
                if (comments) {
                    this.setState({
                        commentInput: '',
                        comments
                    })
                }
            })
            .catch(err => {
                this.setState({
                    invalidPost: true
                })
            })
    }

    handleCommentInput = ({target}) => {
        this.setState({
            commentInput: target.value
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
            .catch(err => {
                this.setState({
                    invalidUrl: true
                })
            })
    }
}

export default Article;