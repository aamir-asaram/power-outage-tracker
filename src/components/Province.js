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
    const response = await fetch(`${baseURL}/schedules/${province}`);
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

  // function to return the date of the next 3 days
  const nextThreeDays = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const day4 = new Date(today);
    day4.setDate(day4.getDate() + 3);
    return [today, tomorrow, dayAfterTomorrow];
  };

  const findStages = async () => {
    const response = await fetch(`${baseURL}/outages/${province}`);
    const data = await response.json();
    // loop through data and find the stage
    const stages = [];
    console.log(data);
    data.forEach((detail) => {
      if (!stages.includes(detail.stage)) {
        stages.push(detail.stage);
      }
    });
    return stages;
  };

  const handleClick = async () => {
    const details = await fetchDetails();
    const stages = await findStages();
    const days = nextThreeDays();
    const outages = [];

    days.forEach((day) => {
      stages.forEach((stage) => {
        details.outages.forEach((outage) => {
          if (outage.stage === stage && day.getDate() === outage.day1_of_recurrence) {
            outages.push(outage);
          }
        });
      });
    });

    days.forEach((day) => {
      console.log(day.getDate());
      outages.forEach((outage) => {
        if (day.getDate() === outage.day1_of_recurrence) {
          console.log(outage);
        }
      });
      console.log('----------------');
    });
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
