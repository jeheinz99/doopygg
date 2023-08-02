const axios = require('axios')
const leagueUtils = {};

// function to get latest lol version 
leagueUtils.getLeagueVersion = async () => {
  const versionData = await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`);
  const versionParts = versionData.data[0].split('.');
  const gameVersion = versionParts.slice(0, 2).join('.');
  return gameVersion;
};

leagueUtils.getItemsData = async (version) => {
  const itemsData = await axios.get(`https://raw.communitydragon.org/${version}/plugins/rcp-be-lol-game-data/global/default/v1/items.json`);
  return itemsData.data;
};

leagueUtils.getSummSpellData = async (version) => {
  const summSpellData = await axios.get(`https://raw.communitydragon.org/${version}/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json`);
  return summSpellData.data;
};

module.exports = leagueUtils;