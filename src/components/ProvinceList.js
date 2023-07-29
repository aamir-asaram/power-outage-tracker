import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinces } from '../redux/provinces/provincesSlice';
import Province from './Province';
import './provinceList.css';

const ProvinceList = () => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.provinces.provinces);
  const loading = useSelector((state) => state.provinces.loading);
  const error = useSelector((state) => state.provinces.error);
  const splitProvinces = [];

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(fetchProvinces());
      provinces.forEach((province) => {
        splitProvinces.push(province.split('-').join(' '));
      });
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
      <ul>
        {provinces.map((province) => (
          <Province key={province} province={province} />
        ))}
      </ul>
    </div>
  );
};

export default ProvinceList;
