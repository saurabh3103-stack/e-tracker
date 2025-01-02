import React from 'react';
import loader from '../assets/loader.gif';

const Loader = () => {
  return (
    <>
    <div class="d-flex justify-content-center align-items-center" style={{height:"83vh"}}>
      <div class="d-flex loader-container align-items-center">
        <div class="spinner-border text-success me-2" role="status" aria-hidden="true"></div>
          <strong>Loading...</strong>
      </div>
    </div>
    </>
  );
};

export default Loader;
