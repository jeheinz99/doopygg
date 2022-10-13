import React from 'react';
import { useSelector } from 'react-redux';
import TraitsBox from './TraitsBox.jsx';
import UnitsBox from './UnitsBox.jsx';
import ItemsBox from './ItemsBox.jsx';

const RecentMatchesBox = () => {

  const TFTData = useSelector(state => state.tft.TFTData);

  const traitsObj = {};
  const unitsObj = {};
  const itemsObj = {};

  const getPlacements = data => {
    const placementsArr = [];
    let avgPlacement = 0;
    let top4Count = 0;

    for (let i = 0; i < data.length; i++) {
      placementsArr.push(data[i].placement);
      avgPlacement += data[i].placement;
      if (data[i].placement <= 4) {
        top4Count++;
      }
      
    }

    avgPlacement = (avgPlacement / data.length);
    const top4Percent = ((top4Count / data.length)*100).toFixed();

    return {
      placements: placementsArr,
      avgPlacement: avgPlacement,
      top4Count: top4Count,
      top4Percent: top4Percent,
    }; 
  };
  
  const sortTraits = data => {
    const tempArr = [];
    
    for (let i in data) {
      tempArr.push(data[i]);
    }

    tempArr.sort((a, b) => {
      return ((b.count - a.count) === 0 ? (b.unitCount - a.unitCount) : (b.count - a.count));
    });

    return {
      top5Played: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]],
      allPlayed: tempArr,
    };
  };
  
  const sortUnits = data => {
    const tempArr = [];

    for (let i in data) {
      tempArr.push(data[i]);
    }

    tempArr.sort((a, b) => {
      return ((b.played - a.played) === 0 ? (b.playedWithItems - a.playedWithItems) : (b.played - a.played));
    });

    return {
      top5Played: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]],
      allPlayed: tempArr,
    };
  };

  const sortItems = data => {
    const tempArr = [];
    
    for (let i in data) {
      tempArr.push(data[i]);
    }

    tempArr.sort((a, b) => {
      return (b.played - a.played);
    });
    return {
      top5Played: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4]],
    };
  };

  // traits data from player tft matches
  for (let i = 0; i < TFTData.length; i++) {
    for (let j = 0; j < TFTData[i].traits.length; j++) {
      
      if (traitsObj[TFTData[i].traits[j].name]) {
        traitsObj[TFTData[i].traits[j].name].unitCount += TFTData[i].traits[j].num_units;
        traitsObj[TFTData[i].traits[j].name].styleCount[TFTData[i].traits[j].style] += 1;
        traitsObj[TFTData[i].traits[j].name].tier_frequency += (TFTData[i].traits[j].tier_current / TFTData[i].traits[j].tier_total);
        
        (TFTData[i].traits[j].tier_current >= 1 ? traitsObj[TFTData[i].traits[j].name].count += 1 : null);
        if (TFTData[i].placement === 1) {
          traitsObj[TFTData[i].traits[j].name].placements.first += 1;
        }
        else if (TFTData[i].placement <= 4) {
          traitsObj[TFTData[i].traits[j].name].placements.top4 += 1;
        }
        else {
          traitsObj[TFTData[i].traits[j].name].placements.bot4 += 1;
        }
      }

      else {
        const newObj = {};
        newObj.name = TFTData[i].traits[j].name;
        newObj.unitCount = TFTData[i].traits[j].num_units;
        newObj.traitIcon = TFTData[i].traits[j].traitIcon;
        newObj.styleCount = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0};
        newObj.placements = {top4: 0, first: 0, bot4: 0};
        
        (TFTData[i].traits[j].tier_current >= 0 ? newObj.count = 1 : newObj.count = 0);
        
        if (TFTData[i].placement === 1) { 
          newObj.placements.first = 1;
        }
        else if (TFTData[i].placement <= 4) {
          newObj.placements.top4 = 1;
        }
        else {
          newObj.placements.bot4 = 1;
        }

        // counts frequency relative to how many units there are
        // i.e/ if tier_current is 1 and tier_total is 4, then it's 25% filled (1/4 units).
        newObj.tier_frequency = (TFTData[i].traits[j].tier_current / TFTData[i].traits[j].tier_total);
        newObj.styleCount[TFTData[i].traits[j].style] = 1;

        traitsObj[TFTData[i].traits[j].name] = newObj;
      }

    }
  }

  // units data from player tft matches
  for (let i = 0; i < TFTData.length; i++) {
    for (let j = 0; j < TFTData[i].units.length; j++) {
      if (unitsObj[TFTData[i].units[j].character_id]) {
        unitsObj[TFTData[i].units[j].character_id].played += 1;
        if (TFTData[i].placement === 1) {
          unitsObj[TFTData[i].units[j].character_id].placements.first += 1;
        }
        else if (TFTData[i].placement <= 4) {
          unitsObj[TFTData[i].units[j].character_id].placements.top4 += 1;
        }
        else {
          unitsObj[TFTData[i].units[j].character_id].placements.bot4 += 1;
        }

        if (TFTData[i].units[j].items.length > 0) {
          unitsObj[TFTData[i].units[j].character_id].playedWithItems += 1;
          for (let k = 0; k < TFTData[i].units[j].items.length; k++) {
            if (itemsObj[TFTData[i].units[j].items[k]]) {
              itemsObj[TFTData[i].units[j].items[k]].played += 1;
            }
            else {
              const newObj = {};
              newObj.id = TFTData[i].units[j].items[k];
              newObj.played = 1;
              newObj.icon = TFTData[i].units[j].itemIcons[k];
              itemsObj[TFTData[i].units[j].items[k]] = newObj;
            }
            // if (unitsObj[TFTData[i].units[j].character_id].items[TFTData[i].units[j].items[k]]) {
            //   unitsObj[TFTData[i].units[j].character_id].items[TFTData[i].units[j].items[k]] += 1;
            // }
            // else {
            //   unitsObj[TFTData[i].units[j].character_id].items[TFTData[i].units[j].items[k]] = 1;
            // }
          }
        }
      }
      else {
        const newObj = {};
        newObj.character_id = TFTData[i].units[j].character_id;
        newObj.rarity = TFTData[i].units[j].rarity;
        newObj.playedWithItems = 0;
        newObj.played = 0;
        newObj.unitIcon = TFTData[i].units[j].unitIcon;
        newObj.items = {};
        newObj.itemIcons = {};
        newObj.placements = {top4: 0, first: 0, bot4: 0};

        if (TFTData[i].placement === 1) { 
          newObj.placements.first = 1;
        }
        else if (TFTData[i].placement <= 4) {
          newObj.placements.top4 = 1;
        }
        else {
          newObj.placements.bot4 = 1;
        }

        if (TFTData[i].units[j].items.length > 0) {
          newObj.playedWithItems += 1;
          newObj.played += 1;
          for (let k = 0; k < TFTData[i].units[j].items.length; k++) {
            if (itemsObj[TFTData[i].units[j].items[k]]) {
              itemsObj[TFTData[i].units[j].items[k]].played += 1;
            }
            else {
              const newObj = {};
              newObj.id = TFTData[i].units[j].items[k];
              newObj.played = 1;
              newObj.icon = TFTData[i].units[j].itemIcons[k];
              itemsObj[TFTData[i].units[j].items[k]] = newObj;
            }
            // if (newObj.items[TFTData[i].units[j].items[k]]) {
            //   newObj.items[TFTData[i].units[j].items[k]] += 1;
            // }
            // else {
            //   newObj.items[TFTData[i].units[j].items[k]] = 1;
            // }
          }
        }
        else {
          newObj.played += 1;
        }
        unitsObj[TFTData[i].units[j].character_id] = newObj;
      }
    }
  }

  const sortedTraits = sortTraits(traitsObj);

  const sortedUnits = sortUnits(unitsObj);
  const sortedItems = sortItems(itemsObj);
  
  const placements = getPlacements(TFTData);

  const traitsArr = [];
  for (let i = 0; i < sortedTraits.top5Played.length; i++) {
    traitsArr.push(<TraitsBox
    key={`traits-${i}`}
    id={i}
    placements={sortedTraits.top5Played[i].placements}
    name={sortedTraits.top5Played[i].name}
    count={sortedTraits.top5Played[i].count}
    styleCount={sortedTraits.top5Played[i].styleCount}
    unitCount={sortedTraits.top5Played[i].unitCount}
    tierFreq={sortedTraits.top5Played[i].tier_frequency}
    traitIcon={sortedTraits.top5Played[i].traitIcon}
    />);
  }

  const placementsArr = [];
  const placementsArr2 = [];
  for (let i = 0; i < placements.placements.length; i++) {
    (placementsArr.length < 5 ?
    placementsArr.push(<div 
      className="placementBox"
      key={`placement-${i}`} 
      id={`placement-${placements.placements[i]}`}>
      <p>{placements.placements[i]}</p>
      </div>) : 
    placementsArr2.push(<div 
      className="placementBox"
      key={`placement-${i}`} 
      id={`placement-${placements.placements[i]}`}>
      <p>{placements.placements[i]}</p>
      </div>)
    );
  }

  const unitsArr = [];
  for (let i = 0; i < sortedUnits.top5Played.length; i++) {
    unitsArr.push(<UnitsBox
    key={`units-${i}`}
    id={i}
    placements={sortedUnits.top5Played[i].placements}
    rarity={sortedUnits.top5Played[i].rarity}
    name={sortedUnits.top5Played[i].character_id}
    played={sortedUnits.top5Played[i].played}
    unitIcon={sortedUnits.top5Played[i].unitIcon}
    />);
  }

  const itemsArr = [];
  for (let i = 0; i < sortedItems.top5Played.length; i++) {
    itemsArr.push(<ItemsBox
    key={`items-${i}`}
    id={i}
    itemId={sortedItems.top5Played[i].id}
    played={sortedItems.top5Played[i].played}
    icon={sortedItems.top5Played[i].icon}
    />);
  }
  
  return (
    <div className="TFTRecentMatchesContainer">

      <div className="PlacementsBar">
        
        <div id="tftr10header">
          <p> Recent 10 Matches </p>
          {placements.avgPlacement === 1 && <p id="avgPlacementTag1"><span>avg</span> {placements.avgPlacement} </p>}
          {placements.avgPlacement > 1 && placements.avgPlacement <= 2 && <p id="avgPlacementTag2"><span>avg</span> {placements.avgPlacement} </p>}
          {placements.avgPlacement > 2 && placements.avgPlacement <= 3 && <p id="avgPlacementTag3"><span>avg</span> {placements.avgPlacement} </p>}
          {placements.avgPlacement > 3 && placements.avgPlacement <= 4 && <p id="avgPlacementTag4"><span>avg</span> {placements.avgPlacement} </p>}
          {placements.avgPlacement > 4 && <p id="avgPlacementTag5"><span>avg</span> {placements.avgPlacement} </p>}
        </div>

        <div className="placementArr1">
          {placementsArr}
        </div>

        <div className="placementArr2">
          {placementsArr2}
        </div>

        <div className="PlacementInfo">

          <div className="PlacementInfoDiv1">
            <p> {TFTData.length} Games <span>{`(${placements.top4Count}W`}-</span><span>{`${(TFTData.length - placements.top4Count)}L)`}</span></p>
            <p> Top 4: {placements.top4Percent}% </p>
          </div>

          <div className="PlacementInfoDiv2">
            <div className="WinLossBar">
              <div className="winBar" id="tftR10WinBar" style={{width: `${placements.top4Percent}%`}}>{placements.top4Count}W</div>
              <div className="lossBar" id="tftR10WinBar" style={{width: `${100 - placements.top4Percent}%`}}>{(TFTData.length - placements.top4Count)}L</div>
            </div>
          </div>

        </div>
      </div>

      <div className="RecentUnits">

        <div id="tftr10unitheader">
          <ul>
            <p> Units </p>
            <li> Name </li>
            <li> Played </li>
            <li> Top4 % </li>
          </ul>
        </div>

        <div className="RecentUnitsBoxes">
          {unitsArr}
        </div>

      </div>
      
      <div className="RecentTraits">

        <div id="tftr10traitheader">
          <ul>
            <p> Traits </p>
            <li> Name </li>
            <li> Played </li>
            <li> Top4 % </li>
          </ul>
        </div>

        <div className="RecentTraitsBoxes">
          {traitsArr}
        </div>

      </div>

      <div className="RecentItems">
        <div id="tftr10itemsheader">
          <ul>
            <p> Items </p>
            <li> Played </li>
          </ul>
        </div>

        <div className="RecentItemsBoxes">
          {itemsArr}
        </div>
      </div>

    </div>
  );
};

export default RecentMatchesBox;