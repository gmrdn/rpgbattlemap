import React from 'react';
import { useFetch } from '../hooks';

const Grid = () => {
  const [data, loading] = useFetch('/grid');

  return (
    <>
      <h5>Grid component</h5>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <p>{data.grid}</p>
        </div>
      )}
    </>
  );
};

export default Grid;
