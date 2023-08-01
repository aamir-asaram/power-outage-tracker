import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvinces } from '../redux/provinces/provincesSlice';
import Province, { categories } from './Province';
import Current, { fetchDetails } from './Current';
import './provinceList.css';

const ProvinceList = () => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.provinces.provinces);
  const loading = useSelector((state) => state.provinces.loading);
  const error = useSelector((state) => state.provinces.error);
  const [splitProvinces, setSplitProvinces] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState([]);

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(fetchProvinces());
      setFilteredProvinces(provinces);
    } else {
      const updatedSplitProvinces = provinces.map((province) => province.split('-').join(' '));
      setSplitProvinces(updatedSplitProvinces);
      setFilteredProvinces(updatedSplitProvinces);
    }
  }, [dispatch, provinces]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  const handleChange = (e) => {
    const filter = e.target.value.toLowerCase();

    if (filter === 'all') {
      setFilteredProvinces(splitProvinces);
    } else {
      const filteredProvinces = splitProvinces.filter(
        (province) => province.includes(filter),
      );
      setFilteredProvinces(filteredProvinces);
    }
  };

  return (
    <div>
      <Current />
      <div id="filter">
        <select onChange={handleChange}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredProvinces.map((province) => (
          <Province key={province} province={province} fetchDetails={fetchDetails} />
        ))}
      </ul>
    </div>
  );
};

export default ProvinceList;
