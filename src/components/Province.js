import React from 'react';
import PropTypes from 'prop-types';

const categories = [
  'Buffalo City', 'City Of Cape Town', 'City Power', 'Eastern Cape',
  'Eskom Direct', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const Province = ({ province }) => {
  const str = province.split('-').join(' ');
  // find the caregory that is contained in the province string ex 'Buffalo City'
  // in 'Buffalo City - Eastern Cape'
  let category;
  categories.forEach((cat) => {
    if (str.includes(cat.toLowerCase())) {
      category = cat;
    }
  });
  // remove the length of the category from the string

  return (
    <li>
      <span className="category">{category}</span>
      <span className="province">{str}</span>
    </li>
  );
};

Province.propTypes = {
  province: PropTypes.string.isRequired,
};

export default Province;
