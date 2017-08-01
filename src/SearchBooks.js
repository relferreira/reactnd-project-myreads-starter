import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';

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
    BooksAPI.update(book, shelf).then(this.loadBooks);

  render() {
    const { search, books } = this.state;
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
                    shelf={book.shelf}
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

export default SearchBooks;
