import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ListBooks from './list-books/ListBooks';
import SearchBooks from './search-books/SearchBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    shelf: {}
  };
  handleUpdateShelf = shelf => this.setState({ shelf });
  render() {
    const { shelf } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks onUpdateShelf={this.handleUpdateShelf} />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks
              shelf={shelf}
              onUpdateShelf={this.handleUpdateShelf}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
