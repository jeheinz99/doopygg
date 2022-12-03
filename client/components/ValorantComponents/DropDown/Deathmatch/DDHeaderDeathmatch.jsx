import Tooltip from "../../../SharedComponents/Tooltip";

const DDHeaderDeathmatch = () => {

  return (
    <div className="team-header-dd" id="deathmatch-header">
      <h3> Scoreboard </h3>
      <p> Riot ID </p>
      <p> Kills </p>
      <p> Deaths </p>
      <p> Assists </p>
      <Tooltip tooltipType={'text'}
        tooltipContent={'Kills, Deaths, Assists'}
        width={'100px'}
        contentClassName={''}
        content={'K/D/A'}
        leftPercent={55}/>  
      <Tooltip tooltipType={'text'}
        tooltipContent={'Total Combat Score'}
        width={'100px'}
        contentClassName={''}
        content={'CS'}
        leftPercent={55}/>
    </div>
  );
};

export default DDHeaderDeathmatch;