import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './provinceList.css';

const categories = [
  'Buffalo City', 'City Of Cape Town', 'City Power', 'Eastern Cape',
  'Eskom Direct', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
];

const baseURL = 'https://eskom-calendar-api.shuttleapp.rs';

const Details = () => {
  const { province } = useParams();

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
  const nextDays = (num) => {
    const days = [];
    for (let i = 0; i < num; i += 1) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const findStages = async () => {
    const response = await fetch(`${baseURL}/outages/${province}`);
    const data = await response.json();
    // loop through data and find the stage
    const stages = [];
    data.forEach((detail) => {
      if (!stages.includes(detail.stage)) {
        stages.push(detail.stage);
      }
    });
    return stages;
  };

  const findLowestStage = (dayOutages) => {
    const times = [];
    const stages = [];
    const outages = [];
    dayOutages.forEach((outage) => {
      if (!times.includes(outage.start_time)) {
        times.push(outage.start_time);
        stages.push(outage.stage);
        outages.push(outage);
      } else if (stages[times.indexOf(outage.start_time)] > outage.stage) {
        stages[times.indexOf(outage.start_time)] = outage.stage;
        outages[times.indexOf(outage.start_time)] = outage;
      }
    });
    return outages;
  };

  const [display, setDisplay] = useState([]);

  const output = async () => {
    const details = await fetchDetails();
    const stages = await findStages();
    const days = nextDays(11);
    const outages = [];
    console.log(days);
    const displayData = [];
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
      // log the day in the format day month year
      const dayString = `${day.getDate()} ${day.toLocaleString('default', { month: 'long' })} ${day.getFullYear()}`;
      const dayOutages = [];
      outages.forEach((outage) => {
        if (day.getDate() === outage.day1_of_recurrence) {
          dayOutages.push(outage);
        }
      });
      const out = findLowestStage(dayOutages);
      // sort outages by start time
      out.sort((a, b) => {
        if (a.start_time < b.start_time) {
          return -1;
        }
        if (a.start_time > b.start_time) {
          return 1;
        }
        return 0;
      });
      displayData.push({ day: dayString, outages: out });
    });
    setDisplay(displayData);
  };

  useEffect(() => {
    output();
  }, []);
  console.log(display);

  return (
    <>
      <h1 id="details">{`${category} - ${str}`}</h1>
      {/* Render the elements from the 'display' state */}
      {display.map((d) => (
        <div key={d.day}>
          <h1 id="day-head">{d.day}</h1>
          {d.outages.map((o) => (
            <div key={o.start_time} className="outage">
              <h2 className="stage">{`Stage ${o.stage} `}</h2>
              <h2>{`${o.start_time.slice(0, -3)} - ${o.finsh_time.slice(0, -3)}`}</h2>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Details;
