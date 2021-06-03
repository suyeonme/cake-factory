import React, { useEffect } from 'react';
import axios from 'axios';

const CakeCollection = () => {
  const getJwt = async () => {
    const res = await axios('/jwt_get');
    console.log(res);
  };

  useEffect(() => {
    getJwt();
  }, []);

  return <div>CakeCollection</div>;
};

export default CakeCollection;
