import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    search: '',
    results: []
  };
  handleSearch = event => {
    this.setState({ search: event.target.value });

    BooksAPI.search(this.state.search, 10).then(results =>
      this.setState({ results })
    );
  };
  render() {
    const { search } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results &&
              this.state.results.map((book, index) =>
                <li key={index}>
                  <Book
                    title={book.title}
                    authors={book.authors}
                    image={
                      book.imageLinks.smallThumbnail ||
                      book.imageLinks.thumbnail
                    }
                  />
                </li>
              )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
