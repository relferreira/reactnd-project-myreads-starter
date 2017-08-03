import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from '../../component/Book';
import * as BooksAPI from '../../BooksAPI';

export function getReadingBooks(books) {
  return books.filter(book => book.shelf === 'currentlyReading');
}

export function getWantToReadBooks(books) {
  return books.filter(book => book.shelf === 'wantToRead');
}

export function getReadBooks(books) {
  return books.filter(book => book.shelf === 'read');
}

export function formatShelf(books) {
  const filterByShelf = (books, shelf) =>
    books.filter(book => book.shelf === shelf).map(book => book.id);

  return {
    currentlyReading: filterByShelf(books, 'currentlyReading'),
    read: filterByShelf(books, 'read'),
    wantToRead: filterByShelf(books, 'wantToRead')
  };
}

class ListBooks extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () =>
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      this.props.onUpdateShelf(formatShelf(books));
    });

  handleShelfChange = (book, shelf) =>
    BooksAPI.update(book, shelf).then(this.loadBooks);

  renderBook = (book, index) => {
    return (
      <Book
        key={index}
        title={book.title}
        authors={book.authors}
        image={book.imageLinks.smallThumbnail || book.imageLinks.thumbnail}
        shelf={book.shelf}
        onShelfChange={event =>
          this.handleShelfChange(book, event.target.value)}
      />
    );
  };

  render() {
    const { books } = this.state;
    return (
      <div className="list-books">
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

export default ListBooks;
