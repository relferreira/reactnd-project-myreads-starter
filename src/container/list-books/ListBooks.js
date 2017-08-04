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

  renderBook = (book, index) => {
    return (
      <Book
        key={index}
        title={book.title}
        authors={book.authors}
        image={book.imageLinks.smallThumbnail || book.imageLinks.thumbnail}
        shelf={book.shelf}
        onShelfChange={event =>
          this.props.onUpdateShelf(book, event.target.value)}
      />
    );
  };

  render() {
    const { books, loading } = this.props;
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
                  {getReadingBooks(books).map(this.renderBook)}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {getWantToReadBooks(books).map(this.renderBook)}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {getReadBooks(books).map(this.renderBook)}
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
