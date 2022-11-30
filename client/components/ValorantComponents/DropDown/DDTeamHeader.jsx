import Tooltip from "../../SharedComponents/Tooltip";

const DDTeamHeader = (props) => {

  const { teamName } = props;

  return (
    <div className="team-header-dd" id="team1header">
      <h3> { teamName } </h3>
      <p id="test-p"> Riot ID </p>
      <p> Rank </p>
      <Tooltip tooltipType={'text'}
        tooltipContent={'Kills, Deaths, Assists'}
        width={'100px'}
        contentClassName={''}
        content={'K/D/A'}
        leftPercent={55}/>
      <Tooltip tooltipType={'text'}
        tooltipContent={'Headshot %'}
        width={'100px'}
        contentClassName={''}
        content={'HS%'}
        leftPercent={55}/>
      <Tooltip tooltipType={'text'}
        tooltipContent={'Average Damage per Round'}
        width={'100px'}
        contentClassName={''}
        content={'ADR'}
        leftPercent={55}/>
    </div>
  );
};

export default DDTeamHeader;