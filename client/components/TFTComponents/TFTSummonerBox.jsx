import React from 'react';
import { useSelector } from 'react-redux';

const TFTSummonerBox = () => {

  const summonerName = useSelector(state => state.tft.summonerName);
  const summonerIcon = useSelector(state => state.tft.summonerIcon);
  const summonerRank = useSelector(state => state.tft.summonerRank);

  return (
    <div>
      <div className="SummonerInfoBox" id="TFTSummonerInfoBox">

        <div className="SummonerInfo">
          {summonerName ? <img id="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerIcon}.jpg`}/> : ''}
          <p>{`Name: ${summonerName}`}</p>
        </div>

        <div className="SummonerRankInfo">
          <div className="TFTRankedSolo">
            <h2> Ranked Solo/Duo </h2>
            <div className="rankBorderDiv"><img id="unrankedIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.rankedSolo[0].toLowerCase()}.png`}/></div>
            <p>{`${summonerRank.rankedSolo[0]} ${summonerRank.rankedSolo[2]} ${summonerRank.rankedSolo[1]} LP`}</p>
          </div>

          <div className="TFTDoubleUp">
            <h2> Double Up </h2>
            {summonerRank.doubleUp[1] === undefined && <div className="rankBorderDiv"><img id="unrankedIcon" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png"/></div>}
            {summonerRank.doubleUp[1] === undefined && <p> Unranked </p>}
            {summonerRank.doubleUp[1] && <div className="rankBorderDiv"><img id="unrankedIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${summonerRank.doubleUp[0].toLowerCase()}.png`}/></div>}
            {summonerRank.doubleUp[1] && <p>{`${summonerRank.doubleUp[0]} ${summonerRank.doubleUp[2]} ${summonerRank.doubleUp[1]} LP`}</p>}
          </div>
        </div>


      </div>

    </div>
  );
};

export default TFTSummonerBox;
