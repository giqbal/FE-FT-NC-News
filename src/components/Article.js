import React, { Component } from 'react';
import CommentBox from './CommentBox';
import Vote from "./Vote";
import UserContext from '../userContext';
import {Link, Redirect} from 'react-router-dom';
import * as api from '../api';

class Article extends Component {
    state = {
        article: {},
        comments: [],
        commentInput: '',
        invalidUrl: false,
        invalidPost: false,
        invalidComment: false
    }

    componentDidMount() {
        this.fetchArticle();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticle();
    }

    render() {
        const {article, commentInput, comments, invalidUrl, invalidPost, invalidComment} = this.state
        const sortedCommentsByTime = [...comments].sort((a, b) => b.created_at - a.created_at);
        if (invalidUrl) return <Redirect to={{pathname: '/error/404', state:{from: 'article'}}}/>
        else if (invalidComment) return <Redirect to={{pathname: 'error/404', state: {from: 'comment'}}} />
        else return (Object.keys(article).length?
            <div className='section'>
                <section className='content container box'>
                    <h2>{article.title}</h2>
                    <h4><Link to={`/user/${article.created_by}`}>{article.created_by}</Link></h4>
                    <span className='tag'><Link to={`/topic/${article.belongs_to}`}>{article.belongs_to}</Link></span>
                    <p>{article.body}</p>
                    <UserContext.Consumer>
                        {user => <Vote votes={article.votes} updateVote={(vote) => this.updateArticleVote(user, vote)}/>}
                    </UserContext.Consumer>
                </section>
                <div className='field box'>
                    <p>----------<span role='img' aria-label='comment'>💬</span>----------</p>
                    <UserContext.Consumer>
                        {currentUser => currentUser.username && <textarea className='textarea' type='text' placeholder='Comment...' onChange={this.handleCommentInput} value={commentInput}/>}
                    </UserContext.Consumer>
                    <UserContext.Consumer>
                        {currentUser => currentUser.username && <a className='button' onClick={() => this.postComment(currentUser)}>Share your thoughts</a>}
                    </UserContext.Consumer>
                    {invalidPost && <p>Can't post an empty comment</p>}  
                </div>
                {sortedCommentsByTime.map(comment => <CommentBox key={comment._id} deleteComment={this.deleteComment} comment={comment} updateCommentVote={this.updateCommentVote}/>)}
            </div>
            :
            <span class="icon">
                <i class="fas fa-spinner fa-pulse"></i>
            </span>
        );
    }

    updateArticleVote = (user, vote) => {
        user.username && api.updateVoteCount(this.state.article._id, vote, 'articles')
            .then(({data: {article}}) => {
                this.setState({
                    article
                })
            })
            .catch(err => {
                this.setState({
                    invalidUrl: true
                })
            })
    }

    updateCommentVote = (user, commentId, vote) => {
        user.username && api.updateVoteCount(commentId, vote, 'comments')
            .then(({data: {comment}}) => {
                const updatedComments = this.state.comments.map((existingComment) => comment._id === existingComment._id? comment: existingComment);
                this.setState({
                    comments: updatedComments
                })
            })
            .catch(err => {
                this.setState({
                    invalidComment: true
                })
            })
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
            .catch(err => {
                this.setState({
                    invalidComment: true
                })
            })
    }

    postComment = (user) => {
        api.postComment(this.state.article._id, this.state.commentInput, user._id)
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