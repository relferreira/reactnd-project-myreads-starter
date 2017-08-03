import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Book from '../../component/Book';
import * as BooksAPI from '../../BooksAPI';

export function findShelf(book, shelf) {
  for (let key in shelf) {
    if (shelf[key].find(id => id === book.id)) return key;
  }
  return 'none';
}

class SearchBooks extends Component {
  state = {
    search: '',
    books: []
  };

  handleSearch = event => {
    this.setState({ search: event.target.value });

    BooksAPI.search(this.state.search, 10).then(books => {
      console.log(books);
      this.setState({ books });
    });
  };

  handleShelfChange = (book, shelf) =>
    BooksAPI.update(book, shelf).then(shelf => {
      this.props.onUpdateShelf(shelf);
      // this.loadBooks();
    });

  render() {
    const { search, books } = this.state;
    const { shelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
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
            {books &&
              books.length > 0 &&
              books.map((book, index) =>
                <li key={index}>
                  <Book
                    title={book.title}
                    authors={book.authors}
                    image={
                      book.imageLinks.smallThumbnail ||
                      book.imageLinks.thumbnail
                    }
                    shelf={findShelf(book, shelf)}
                    onShelfChange={event =>
                      this.handleShelfChange(book, event.target.value)}
                  />
                </li>
              )}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  shelf: PropTypes.object.isRequired
};

export default SearchBooks;
