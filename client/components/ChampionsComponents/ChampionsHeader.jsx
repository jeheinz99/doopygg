import React from 'react';

const ChampionsHeader = () => {
  return (
    <div className="champ-stats-header">
      <select id="region-select" name="region">
        <option value="na1">NA</option>
        <option value="euw1">EUW</option>
        <option value="eun1">EUN</option>
        <option value="oc1">OCE</option>
        <option value="kr">KR</option>
        <option value="jp1">JP</option>
        <option value="la1">LAS</option>
        <option value="la2">LAN</option>
        <option value="tr1">TR</option>
        <option value="ru">RU</option>
      </select>

      <select id="queue-select" name="queue">
        <option value="RANKED_SOLO_5X5">Ranked Solo</option>
        <option value="RANKED_FLEX_SR">Ranked Flex</option>
      </select>

      <select id="tier-select" name="tier">
        <option value="CHALLENGER">Challenger</option>
        <option value="GRANDMASTER">Grandmaster</option>
        <option value="MASTER">Master</option>
        <option value="DIAMOND">Diamond</option>
        <option value="PLATINUM">Platinum</option>
        <option value="GOLD">Gold</option>
        <option value="SILVER">Silver</option>
        <option value="BRONZE">Bronze</option>
        <option value="IRON">Iron</option>
      </select>

      <select id="division-select" name="division">
        <option value="I">1</option>
        <option value="II">2</option>
        <option value="III">3</option>
        <option value="IV">4</option>
      </select>
    </div>
  );
};

export default ChampionsHeader;