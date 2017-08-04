import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Book from '../../component/book/Book';
import Loading from '../../component/loading/Loading';

export function getReadingBooks(books) {
  return books.filter(book => book.shelf === 'currentlyReading');
}

export function getWantToReadBooks(books) {
  return books.filter(book => book.shelf === 'wantToRead');
}

export function getReadBooks(books) {
  return books.filter(book => book.shelf === 'read');
}

class ListBooks extends Component {
  state = {
    books: []
  };

  shouldShowEmpty = books => !books || books.length === 0;

  renderBook = (book, index) => {
    return (
      <li key={index}>
        <Book
          title={book.title}
          authors={book.authors}
          image={book.imageLinks.smallThumbnail || book.imageLinks.thumbnail}
          shelf={book.shelf}
          onShelfChange={event =>
            this.props.onUpdateShelf(book, event.target.value)}
        />
      </li>
    );
  };

  render() {
    const { books, loading } = this.props;
    let readingBooks = getReadingBooks(books),
      wantToReadBooks = getWantToReadBooks(books),
      readBooks = getReadBooks(books);
    return (
      <div className="list-books">
        {loading && <Loading />}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.shouldShowEmpty(readingBooks) && <li>Empty</li>}
                  {readingBooks.map(this.renderBook)}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.shouldShowEmpty(wantToReadBooks) && <li>Empty</li>}
                  {wantToReadBooks.map(this.renderBook)}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.shouldShowEmpty(readBooks) && <li>Empty</li>}
                  {readBooks.map(this.renderBook)}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ListBooks;
