import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import * as api from '../api';
import './NewArticleModal.css';

class NewArticleModal extends Component {
    state = {
        titleInput: '',
        bodyInput: '',
        selectTopicInput: 'none',
        postedArticleId: ''
    }

    render() {
        const {topics, hidePostArticleModal} = this.props; 
        const {titleInput, bodyInput, postedArticleId} = this.state;
        return (
            postedArticleId?
            <Redirect to={`/article/${postedArticleId}`}/> :
            <div className='modal'>
                <div className='modal-content'>
                    <span onClick={hidePostArticleModal}>ⓧ</span>
                    <h2>What would you like to post?</h2>
                    <select onChange={this.handleTopicSelect}>
                        <option default value='none'>Select topic</option>
                        {topics.map(topic => <option key={topic._id} value={topic.title}>{topic.title}</option>)}
                    </select>
                    <input type='text' value={titleInput} id='titleInput' onChange={this.handleUserTextInput} />
                    <input type='text' value={bodyInput} id='bodyInput' onChange={this.handleUserTextInput} />
                    <button onClick={this.postArticle}>Post</button>
                </div>
            </div>
        );
    }

    handleUserTextInput = ({target}) => {
        this.setState({
            [target.id]: target.value
        })
    }

    handleTopicSelect = ({target}) => {
        this.setState({
            selectTopicInput: target.value
        })
    }

    postArticle = () => {
        const {selectTopicInput, titleInput, bodyInput} = this.state;
        api.postArticle(selectTopicInput, titleInput, bodyInput, this.props.currentUser._id)
            .then(({status, data}) => {
                if (status === 201) this.setState({
                    postedArticleId: data.article._id
                })
            })
            .catch(console.log)
    }

}

export default NewArticleModal;