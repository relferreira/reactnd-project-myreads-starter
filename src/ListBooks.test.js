import { getWantToReadBooks, getReadingBooks, getReadBooks } from './ListBooks';

const BOOKS = [
  {
    title: 'The Linux Command Line',
    shelf: 'currentlyReading'
  },
  {
    title: "The Cuckoo's Calling",
    shelf: 'wantToRead'
  },
  {
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
});
