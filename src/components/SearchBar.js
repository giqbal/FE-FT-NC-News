import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {debounce} from 'lodash';

class SearchBar extends Component {
    state = {
        searchInput: '',
        searchResults: []
    }

    render() {
        return (
            <div className={this.state.searchResults.length? 'navbar-item has-dropdown is-active': 'navbar-item has-dropdown'}>
                <input className='input' id='search-input' placeholder='🔍 Articles & Topics' value={this.state.searchInput} onChange={this.handleSearchInput}/>
                <div className='navbar-dropdown'>
                {this.state.searchResults.map(result => <div className='navbar-item' key={result._id} onClick={this.clearSearchInput}><Link to={`/${result.itemType}/${result.itemType === 'article'? result._id : result.slug}`}>{`${result.itemType}: ${result.title.substr(0, 100)}...`}</Link></div>)}
                </div>
            </div>
        );
    }

    handleSearchInput = ({target}) => {
        this.setState({
            searchInput: target.value
        })
        this.search(target.value);
    }

    search = debounce(searchTerm => {
        const {articles, topics} = this.props;
        const objsToSearch = articles.concat(topics)
        const searchResults = objsToSearch.reduce((acc, current) => {
            if (
                searchTerm.length &&
                (current.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (current.body && current.body.toLowerCase().includes(searchTerm.toLocaleLowerCase())))
            ) {
                acc.push({...current, itemType: current.body? 'article': 'topic'});
            }
            return acc;
        }, [])
        this.setState({
            searchResults
        })
    }, 500)

    clearSearchInput = () => {
        this.setState({
            searchInput: '',
            searchResults: []
        })
    }
}

export default SearchBar;