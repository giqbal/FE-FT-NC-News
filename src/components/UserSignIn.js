import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class UserSignIn extends Component {
    state = {
        usernameInput: '',
        loginErrorVisible: false
    }
    render() {
        const {currentUser, logout} = this.props;
        return (
            currentUser.username?
                <div className='navbar-item'>
                    <figure className='image is-32x32'>
                        <Link to={`/user/${currentUser.username}`}>
                            <img id='user-avatar' src={currentUser.avatar_url} alt='User avatar'/>
                        </Link>
                    </figure>
                    <a className='button' onClick={logout}>Logout</a>
                </div> :
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="dropdown-trigger navbar-item">
                        Sign In
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <div className="navbar-dropdown is-right is-boxed">
                        <label htmlFor='usernameInput'>Username</label>
                        <input className='input navbar-item' type='text' id='usernameInput' value={this.state.usernameInput} placeholder='username' onChange={this.handleUsernameInput} onKeyUp={this.signInRequestByEnterKey} />
                        {this.state.loginErrorVisible && <p className='navbar-item'>Incorrect username</p>}
                        <hr className="navbar-divider"/>
                        <a className='button navbar-item' onClick={this.signInRequestByButton}>Log In</a>
                    </div>
                </div>
        );
    }

    handleUsernameInput = ({target}) => {
        this.setState({
            usernameInput: target.value
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
                    this.setState({
                        loginErrorVisible: true
                    })
            })
    }
}

export default UserSignIn;