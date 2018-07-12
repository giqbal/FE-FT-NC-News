import React, { Component } from 'react';
import ArticleBox from './ArticleBox';
import * as api from '../api';

class TopicArticles extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        this.fetchArticlesByTopic();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchArticlesByTopic();
    }

    render() {
        const slug = this.props.match.params.topicSlug
        const capitalisedTopic = slug[0].toUpperCase() + slug.slice(1)
        return (
            <div>
                <h2>{capitalisedTopic}</h2>
                {this.state.articles.map(article => <ArticleBox key={article._id} article={article} updateArticleVote={this.updateArticleVote}/>)}
            </div>
        );
    }

    updateArticleVote = (articleId, vote) => {
        api.updateVoteCount(articleId, vote, 'articles')
            .then(({data: {article}}) => {
              const updatedArticles = this.state.articles.map((existingArticle) => {
                return article._id === existingArticle._id? {...existingArticle, votes: article.votes}: existingArticle
              });
              this.setState({
                  articles: updatedArticles
              })
            })
            .catch(console.log)
      }

    fetchArticlesByTopic = () => {
        api.getArticlesByTopic(this.props.match.params.topicSlug)
            .then(({data: {articles}}) => {
                this.setState({
                    articles
                })
            })
    }
}

export default TopicArticles;