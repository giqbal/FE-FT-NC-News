import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import * as api from '../api';
// import './NewArticleModal.css';

class NewArticleModal extends Component {
    state = {
        titleInput: '',
        bodyInput: '',
        selectTopicInput: 'none',
        postedArticleId: ''
    }

    render() {
        const {topics, hidePostArticleModal, enableModal} = this.props; 
        const {titleInput, bodyInput, postedArticleId} = this.state;
        return (
            postedArticleId?
            <Redirect to={`/article/${postedArticleId}`}/> :
            <div className={enableModal? 'modal is-active': 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">What would you like to post?</p>
                    <button className="delete" onClick={hidePostArticleModal} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <div className="select">
                        <select onChange={this.handleTopicSelect}>
                            <option default value='none'>Select topic</option>
                            {topics.map(topic => <option key={topic._id} value={topic.title}>{topic.title}</option>)}
                        </select>
                    </div>
                    <label className="label">Title</label>
                    <input className='input' type='text' value={titleInput} id='titleInput' placeholder='Post Title' onChange={this.handleUserTextInput} />
                    <label className="label">Body</label>
                    <textarea id='bodyInput' className="textarea" onChange={this.handleUserTextInput} value={bodyInput} placeholder="Rant..."></textarea>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={this.postArticle}>Post</button>
                </footer>
                </div>
            </div>
        )



        
        // return (
        //    
        //     <div className='modal'>
        //         <div className='modal-content'>
        //             <span >ⓧ</span>
                    
        //         </div>
        //     </div>
        // );
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