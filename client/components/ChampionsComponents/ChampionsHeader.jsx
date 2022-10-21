import CustomSelect from '../AppComponents/CustomSelect';

const ChampionsHeader = () => {
  return (
    <div className="champ-stats-header">
      <CustomSelect id={'region-select-btn'} selectType={'regions'} init={'NA'}/>
      <CustomSelect id={'queue-select-btn'} selectType={'queues'} init={'Ranked Solo'}/>
      <CustomSelect id={'tier-select-btn'} selectType={'tiers'} init={'Challenger'}/>
      <CustomSelect id={'division-select-btn'} selectType={'divisions'} init={'I'}/>
    </div>
  );
};

export default ChampionsHeader;