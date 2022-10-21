const LiveGameBansBox = props => {

  const { championId } = props;

  const championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;

  return <img className="lg-ban" src={championIcon}/>;
};

export default LiveGameBansBox;