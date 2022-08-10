import React from 'react';
import ItemTimelineBoxItem from './ItemTimelineBoxItem.jsx';

const ItemTimelineBox = props => {

  const { events, minute } = props;

  const eventsObj = {};
  const eventsArr = [];
  const checkArr = (key, count, events) => {
    for (let i = 0; i < events.length; i++) {
      if (key == events[i].itemId) return {event: events[i], count: count}
    }
  };

  for (let i = 0; i < events.length; i++) {
    eventsObj[events[i].itemId] ? eventsObj[events[i].itemId]++ : eventsObj[events[i].itemId] = 1;
  }

  for (let i in eventsObj) {
    const res = checkArr(i, eventsObj[i], events);
    eventsArr.push(<ItemTimelineBoxItem key={`timeline-event-${i}-${eventsObj[i]}`} count={res.count} icon={res.event.path} id={`timeline-event-${res.event.type}`}/>);
  }
  
  return (
    <div className="timeline-events-outer">
      <div className="timeline-events-div">
        {eventsArr}
      </div>
      {minute === 0 ? <p>Start</p> : <p>{minute} min</p>}
    </div>
  );
};

export default ItemTimelineBox;