import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './UserSignIn.css';

class UserSignIn extends Component {
    state = {
        signInVisible: false,
        usernameInput: '',
        loginErrorVisible: false
    }
    render() {
        const {currentUser, logout} = this.props;
        return (
            currentUser.username?
                <div>
                    <img id='user-avatar' src={currentUser.avatar_url} alt='User avatar'/>
                    <Link to={`/user/${currentUser.username}`}>{currentUser.username}</Link>
                    <button onClick={logout}>Logout</button>
                </div> :
                <div >
                    <p onClick={this.handleSignIn}>Sign In</p>
                    {this.state.signInVisible && <input type='text' id='usernameInput' value={this.state.usernameInput} placeholder='username' onChange={this.handleUsernameInput} onKeyUp={this.signInRequestByEnterKey} />}
                    {this.state.signInVisible && <button onClick={this.signInRequestByButton}>Sign In</button>}
                    {this.state.signInVisible && this.state.loginErrorVisible && <p>Incorrect username</p>}
                </div>
                
        );
    }

    handleUsernameInput = ({target}) => {
        this.setState({
            usernameInput: target.value
        })
    }

    handleSignIn = () => {
        this.setState({
            signInVisible: this.state.signInVisible? false: true
        })
    }

    signInRequestByEnterKey = ({key, target}) => {
        if (target.value && key === 'Enter') {
           this.attemptLogin(target.value);
        }
    }

    signInRequestByButton = () => {
        if (this.state.usernameInput) {
            this.attemptLogin(this.state.usernameInput);
        }
    }

    attemptLogin = (username) => {
        this.props.login(username)
            .then(() => {
                this.setState({
                    signInVisible: false,
                    usernameInput: '',
                    loginErrorVisible: false
                })
            })
            .catch(err => {
                if (err) {
                    this.setState({
                        loginErrorVisible: true
                    })
                }
            })
    }
}

export default UserSignIn;