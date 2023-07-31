import React, { useEffect, useState } from 'react';
import './provinceList.css';

const Current = () => {
  const [out, setOut] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('https://eskom-calendar-api.shuttleapp.rs/outages/western-cape-stellenbosch');
        const data = await response.json();
        setOut(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []);

  const maxStage = () => {
    let max = 0;
    out.forEach((detail) => {
      if (detail.stage > max) {
        max = detail.stage;
      }
    });
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
