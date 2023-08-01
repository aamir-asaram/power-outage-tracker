import React from 'react';
import './provinceList.css';

export const fetchDetails = async (province = 'western-cape-stellenbosch') => {
  try {
    const response = await fetch(`https://eskom-calendar-api.shuttleapp.rs/outages/${province}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return ('Error fetching data:', error);
  }
};

const out = await fetchDetails();
console.log(out);

const Current = () => {
  const maxStage = () => {
    let max = 0;
    if (out.length > 0) {
      out.forEach((detail) => {
        if (detail.stage > max) {
          max = detail.stage;
        }
      });
    }
    return max;
  };

  const max = maxStage();

  return (
    <div id="current">
      <span>Current Stage: </span>
      <span>{max}</span>
    </div>
  );
};

export default Current;
