const PlayerBox = props => {

  const { 
    characterId, 
    competitiveTier, 
    gameName, 
    tagLine, 
    partyId, 
    playerCard,
    playerTitle,
    puuid,
    state,
    teamId 
  } = props;

  return (
    <div className="PlayerBox">
      {/* <p> {gameName}#{tagLine} </p> */}
    </div>
  );
};

export default PlayerBox;