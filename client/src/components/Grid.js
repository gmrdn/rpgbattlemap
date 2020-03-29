import React from 'react';
import { useFetch } from '../hooks';

const Grid = () => {
  const [data, loading] = useFetch('/grid');

  return (
    <div className="container border">
      <h5>Grid component</h5>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
          <p>{data.grid}</p>
        </div>
      )}
    </div>
  );
};

export default Grid;
