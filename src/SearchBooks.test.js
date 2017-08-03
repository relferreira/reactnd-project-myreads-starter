import { findShelf } from './SearchBooks.js';

const SHELF = {
  currentlyReading: ['123'],
  read: ['12345'],
  wantToRead: ['1234']
};

describe('Search Books', () => {
  it('should find shelf for book', () => {
    let book = { id: '123' };
    expect(findShelf(book, SHELF)).toEqual('currentlyReading');

    book = { id: '1234' };
    expect(findShelf(book, SHELF)).toEqual('wantToRead');

    book = { id: '12345' };
    expect(findShelf(book, SHELF)).toEqual('read');
  });

  it('should return none for book not in the shelf', () => {
    let book = { id: '123456' };
    expect(findShelf(book, SHELF)).toEqual('none');
  });
});
