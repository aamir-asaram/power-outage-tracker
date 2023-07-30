import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Buffalo City', 'City Of Cape Town', 'City Power', 'Eastern Cape',
  'Eskom Direct', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const Province = ({ province }) => {
  const navigate = useNavigate();

  let str = province.split('-').join(' ');
  let category;
  categories.forEach((cat) => {
    if (str.includes(cat.toLowerCase())) {
      category = cat;
    }
    str = str.replace(cat.toLowerCase(), '');
  });

  const handleClick = async () => {
    navigate(`/${province}`);
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
