const ItemTimelineBoxItem = props => {

  const { id, icon, count } = props;
  
  return (
    <div className="timeline-item-box-div">
      <img className="timeline-item-box" id={id} src={icon}/>
      {count > 1 && <div className="timeline-item-box-counter"> {count} </div>}
    </div>
  );
};

export default ItemTimelineBoxItem;