import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const TFTDDUnitsBox = props => {

  const { id, unit } = props;

  const stars = [];
  for (let i = 0; i < unit.tier; i++) {
    stars.push(<AiFillStar key={`star-${i}`} className='tft-star' id={`star-${id}`}/>);
  }

  const items = [];
  for (let i = 0; i < unit.items.length; i++) {
    items.push(<img key={`item-img-${i}`} id="item-img" src={unit.itemIcons[i]}/>);
  }
  
  return (
    <div className="OuterTFTDDUnitBox">
      <div className="TFTstarsDiv">
        {stars}
      </div>

      <img className="TFTunit" id={id} src={unit.unitIcon}/>
      
      <div className="TFTitemsDiv">
        {items}
      </div>
      
    </div>
  );
};

export default TFTDDUnitsBox;