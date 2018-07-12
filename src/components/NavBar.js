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
                <div>Topics</div>
                <div>
                    <input placeholder='🔍 Articles' value={this.state.searchInput} onChange={this.handleSearchInput}/>
                    {this.state.searchResults.map(result => <div key={result._id} onClick={this.clearSearchInput}><Link to={`/article/${result._id}`}>{result.title}</Link></div>)}
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
        const searchResults = this.props.articles.reduce((acc, article) => {
            if (
                searchTerm.length &&
                (article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                article.body.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
            ) {
                acc.push(article);
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