import React from 'react';
import PropTypes from 'prop-types';

const categories = [
  'Buffalo City', 'City Of Cape Town', 'City Power', 'Eastern Cape',
  'Eskom Direct', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const baseURL = 'https://eskom-calendar-api.shuttleapp.rs';

const Province = ({ province }) => {
  const fetchDetails = async () => {
    const response = await fetch(`${baseURL}/outages/${province}`);
    const data = await response.json();
    return data;
  };

  let str = province.split('-').join(' ');
  let category;
  categories.forEach((cat) => {
    if (str.includes(cat.toLowerCase())) {
      category = cat;
    }
    str = str.replace(cat.toLowerCase(), '');
  });

  const handleClick = async () => {
    const details = await fetchDetails();
    console.log(details);
  };

  return (
    <li>
      <button type="button" onClick={handleClick}>
        <span className="category">{category}</span>
        <span className="province">{str}</span>
      </button>
    </li>
  );
};

Province.propTypes = {
  province: PropTypes.string.isRequired,
};

export default Province;
