import React from 'react';

const R20PlayedEntry = props => {

  const { profileIconId, summonerName, played, win, loss } = props;
  
  const winPercent = ((win / played)*100).toFixed(0);

  return (
    <div className="recent-played-with-entry">

      <div className="recent-played-with-1">
        <img id="recent-played-profile-icon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`}/>
        <p>{summonerName}</p>
      </div>

      <p>{played}</p>

      <p>{win} - {loss}</p>

      <p>{winPercent}%</p>

    </div>
  );
};

export default R20PlayedEntry;