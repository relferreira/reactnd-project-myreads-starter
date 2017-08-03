import {
  getWantToReadBooks,
  getReadingBooks,
  getReadBooks,
  formatShelf
} from './ListBooks';

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
  it('should return current reading books', () => {
    let filteredBooks = getReadingBooks(BOOKS);
    expect(filteredBooks.length).toEqual(1);
    expect(filteredBooks[0].title).toEqual('The Linux Command Line');
  });

  it('should return want to read books', () => {
    let filteredBooks = getWantToReadBooks(BOOKS);
    expect(filteredBooks.length).toEqual(1);
    expect(filteredBooks[0].title).toEqual("The Cuckoo's Calling");
  });

  it('should return read books', () => {
    let filteredBooks = getReadBooks(BOOKS);
    expect(filteredBooks.length).toEqual(1);
    expect(filteredBooks[0].title).toEqual('Satire TV');
  });

  it('should get shelf info', () => {
    expect(formatShelf(BOOKS)).toEqual({
      currentlyReading: ['123'],
      read: ['12345'],
      wantToRead: ['1234']
    });
  });
});
