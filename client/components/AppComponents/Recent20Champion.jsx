import React from 'react';

const Recent20Champion = props => {

  const { kills, deaths, assists, win, loss, played, cs, champDamage, id, championId } = props;

  const winPercent = ((win / (win + loss))*100).toFixed(2);

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  return (
    <div className="Recent20ChampCard">

      <div className="Recent20ChampCardDiv1">
        <img id="championIconRecent20" src={championIcon}/>
      </div>

      <div className="Recent20ChampCardDiv2">
        <div className="Recent20champCardDiv2box1">
          <p> {id} </p>
          <p> K/D/A: {((kills + assists) / deaths).toFixed(2)} </p>
          {isNaN(winPercent) && <p> 100% W/L </p>}
          {!isNaN(winPercent) && <p> {winPercent} % W/L </p>}
          <p> {played} Games</p>
        </div>
      </div>

    </div>
  );
};

export default Recent20Champion;