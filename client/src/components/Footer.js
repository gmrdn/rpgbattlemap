import React from 'react';
import { useFetch } from '../hooks';

const Footer = () => {
  const [data, loading] = useFetch('/express_backend');

  return (
    <>
      <h5>Footer component</h5>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <p>{data.express}</p>
        </div>
      )}
    </>
  );
};

export default Footer;
