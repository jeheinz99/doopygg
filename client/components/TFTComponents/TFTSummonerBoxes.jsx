const TFTSummonerBoxes = props => {

  const { name, value, percent } = props;

  return (
    <div className="tft-ranked-summoner-box">
      <p>{name}<span>{value}</span></p>
      <div className="WinLossBar">
        <div className="winBar" id="tftPlayedFilledBar" style={{width: `${percent}%`}}>
        </div>
        <div className="lossBar" id="tftPlayedBar" style={{width: `${100 - percent}%`}}>
        </div>
      </div>
    </div>
  );
};

export default TFTSummonerBoxes;