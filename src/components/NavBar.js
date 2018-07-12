import React, { Component } from 'react';

class NavBar extends Component {
    state = {
        searchInput: ''
    }
    render() {
        return (
            <div>
                <div>Topics</div>
                <input placeholder='🔍' value={this.state.searchInput} onChange={this.handleSearchInput}/>
            </div>
        );
    }

    handleSearchInput = ({target}) => {
        this.setState({
            searchInput: target.value
        })
    }
}

export default NavBar;