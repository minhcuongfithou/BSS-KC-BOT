import React from 'react';
import '@/app/styles/timeline.css';

const Timeline = ({ versions }) => {
  return (
    <div className="timeline">
      {versions.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-content">
            <div className="title-timeline">
            <h2 className='version'>Version {item.version}</h2>
            <span className="timeline-date">{item.date}</span>
            </div>
            <ul>
              {item.updates.map((update, idx) => (
                <li key={idx}>✔️ {update}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;