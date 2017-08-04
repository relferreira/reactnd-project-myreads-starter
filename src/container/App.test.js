import { formatShelf, updateBooks } from './App';

const BOOKS = [
  {
    id: '123',
    title: 'The Linux Command Line',
    shelf: 'currentlyReading'
  },
  {
    id: '1234',
    title: "The Cuckoo's Calling",
    shelf: 'wantToRead'
  },
  {
    id: '12345',
    title: 'Satire TV',
    shelf: 'read'
  }
];

describe('List Books', () => {
  it('should get shelf info', () => {
    expect(formatShelf(BOOKS)).toEqual({
      currentlyReading: ['123'],
      read: ['12345'],
      wantToRead: ['1234']
    });
  });
});

describe('Update Books', () => {
  it('should update book shelf', () => {
    let selectedBook = BOOKS[0],
      selectedShelf = 'read';

    let newBooks = updateBooks(BOOKS, selectedBook, selectedShelf);
    expect(newBooks.length).toEqual(3);
    expect(newBooks[0].shelf).toEqual('read');
  });

  it('should add book to list', () => {
    let selectedBook = {
        id: '123456',
        title: 'Satire TV2',
        shelf: 'none'
      },
      selectedShelf = 'read';

    let newBooks = updateBooks(BOOKS, selectedBook, selectedShelf);
    expect(newBooks.length).toEqual(4);
    expect(newBooks.findIndex(book => book.id === '123456')).not.toEqual(-1);
  });

  it('should remove book to list', () => {
    let selectedBook = {
        id: '123',
        title: 'Satire TV2',
        shelf: 'currentlyReading'
      },
      selectedShelf = 'none';

    let newBooks = updateBooks(BOOKS, selectedBook, selectedShelf);
    expect(newBooks.length).toEqual(2);
    expect(newBooks.findIndex(book => book.id === '123')).toEqual(-1);
  });
});
