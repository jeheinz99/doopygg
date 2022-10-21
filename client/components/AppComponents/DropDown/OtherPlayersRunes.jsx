import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const OtherPlayersRunes = props => {

  const { summonerName, runes, championId } = props;

  const regionId = useSelector(state => state.summoners.region);

  const [searchParams, setSearchParams] = useSearchParams();

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  const runeIconsArr = [];
  for (let i = 0; i < runes.length; i++) {
    runeIconsArr.push(<img id={`runes`}/>)
  }

  return (
    <div className="otherPlayerRunesBox" id={`otherPlayers-${runes[4].id}`}>

      <img id="champIconRunesDD" src={championIcon}/>
          <p className="playernames" onClick={() => setSearchParams({ region: regionId, summonerName: summonerName })}>{summonerName}</p>

      <img className="keystoneRunesDD" src={runes[0].icon}/>

      <div className="maintreeDD">
        <img className="minorRuneDD" src={runes[1].icon}/>
        <img className="minorRuneDD" src={runes[2].icon}/>
        <img className="minorRuneDD" src={runes[3].icon}/>
      </div>

      <div className="secondtreeDD">
        <img className="minorRuneDD" src={runes[6].icon}/>
        <img className="minorRuneDD" src={runes[7].icon}/>
      </div>

      <div className="shardsDD">
        <img className="shardDD" src={runes[10].icon}/>
        <img className="shardDD" src={runes[9].icon}/>
        <img className="shardDD" src={runes[8].icon}/>
      </div>

    </div>
  );
};

export default OtherPlayersRunes;