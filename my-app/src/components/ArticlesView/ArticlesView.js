import React, { Component } from 'react';
import axios from 'axios';

import { BallBeat } from 'react-pure-loaders';

import SearchForm from '../SearchForm/SearchForm';

axios.defaults.headers.common['Authorization'] =
  'Bearer 2b084a585a6744c9a99186e76694f8db';

class ArticlesView extends Component {
  state = {
    articles: [],
    currentPage: 1,
    searchQuery: '',
    isloading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, articles: [], error: null });
  };

  fetchArticles = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });

    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=5&page=${currentPage}`,
      )
      .then(res => {
        this.setState(prevState => ({
          articles: [...prevState.articles, ...res.data.articles],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

    return (
      <div>
        {error && <h1>Ошибка, что-то пошло не так, попробуйте еще раз!!!</h1>}

        <h1>Статья</h1>

        <SearchForm onSubmit={this.onChangeQuery} />

        <ul>
          {articles.map(({ title, url }) => (
            <li key={title}>
              <a href={url}>{title}</a>
            </li>
          ))}
        </ul>

        {isLoading && (
          <BallBeat color={'#123abc'} loading={this.state.isLoading} />
        )}

        {shouldRenderLoadMoreButton && (
          <button type="button" onClick={this.fetchArticles}>
            Загрузить еще
          </button>
        )}
      </div>
    );
  }
}

export default ArticlesView;
