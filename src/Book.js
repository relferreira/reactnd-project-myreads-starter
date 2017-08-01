import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ title, authors, image, shelf, onShelfChange }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url("${image}")`
          }}
        />
        <div className="book-shelf-changer">
          <select value={shelf} onChange={onShelfChange}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        {title}
      </div>
      <div className="book-authors">
        {authors}
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  image: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
};

export default Book;
