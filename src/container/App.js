import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import ListBooks from './list-books/ListBooks';
import SearchBooks from './search-books/SearchBooks';
import './App.css';

export function formatShelf(books) {
  const filterByShelf = (books, shelf) =>
    books.filter(book => book.shelf === shelf).map(book => book.id);

  return {
    currentlyReading: filterByShelf(books, 'currentlyReading'),
    read: filterByShelf(books, 'read'),
    wantToRead: filterByShelf(books, 'wantToRead')
  };
}

export function updateBooks(books, selectedBook, selectedShelf) {
  const searchSelectedBook = book => book.id === selectedBook.id;
  if (selectedShelf === 'none')
    return books.filter(book => book.id !== selectedBook.id);
  let updatedBooks = books.map(
    book =>
      searchSelectedBook(book) ? { ...book, shelf: selectedShelf } : book
  );
  if (updatedBooks.findIndex(searchSelectedBook) === -1)
    updatedBooks.push({ ...selectedBook, shelf: selectedShelf });
  return updatedBooks;
}

class BooksApp extends Component {
  state = {
    shelf: {},
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () =>
    BooksAPI.getAll().then(books => {
      this.setState({ books, shelf: formatShelf(books) });
    });

  handleUpdateShelf = (selectedBook, selectedShelf) => {
    BooksAPI.update(selectedBook, selectedShelf).then(shelf => {
      this.setState({
        shelf,
        books: updateBooks(this.state.books, selectedBook, selectedShelf)
      });
    });
  };

  render() {
    const { books, shelf } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks books={books} onUpdateShelf={this.handleUpdateShelf} />}
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
