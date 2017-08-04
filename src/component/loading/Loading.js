import React from 'react';

import loadingIcon from '../../icons/rolling.gif';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="backdrop" />
      <div className="loading-img">
        <img src={loadingIcon} alt="loading indicator" />
      </div>
    </div>
  );
};

export default Loading;
