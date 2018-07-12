import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {debounce} from 'lodash';

class NavBar extends Component {
    state = {
        searchInput: '',
        searchResults: []
    }
    render() {
        return (
            <div>
                <a href='http://localhost:3000/'><h1>Northcoders News</h1></a>
                <div>
                    <input placeholder='🔍 Articles & Topics' value={this.state.searchInput} onChange={this.handleSearchInput}/>
                    {this.state.searchResults.map(result => <div key={result._id} onClick={this.clearSearchInput}><Link to={`/${result.itemType}/${result.itemType === 'article'? result._id : result.slug}`}>{`${result.itemType}: ${result.title}`}</Link></div>)}
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

export default NavBar;