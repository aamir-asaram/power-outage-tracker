import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProvinces } from '../redux/provinces/provincesSlice';

// const categories = [
//   'Buffalo City', 'City of Cape Town', 'City Power', 'Eastern Cape',
//   'Eskom Direct', 'Free State', 'Gauteng', 'KwaZulu Natal', 'Limpopo',
//   'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
// ];

const ProvinceList = () => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.provinces.provinces);
  const loading = useSelector((state) => state.provinces.loading);
  const error = useSelector((state) => state.provinces.error);

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(fetchProvinces());
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div>
      <h2>Provinces</h2>
      <ul>
        {provinces.map((province) => (
          <li key={province.id}>{province}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProvinceList;
