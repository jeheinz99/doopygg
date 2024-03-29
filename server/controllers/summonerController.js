const summonerController = {};
const axios = require('axios');
const db = require('../models/IconPaths');
const lolSummoner = require('../models/LoLSummonerData');
const lolMatches = require('../models/LoLMatchesModel');
const queueData = require('../../queues.json');
const leagueFunctions = require('../../client/functions/league-functions')

const EMPTY_ICON = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_empty.png`

const TREE_STYLES = {
  8000: 'https://raw.communitydragon.org/latest/game/assets/perks/styles/7201_precision.png',
  8100: 'https://raw.communitydragon.org/latest/game/assets/perks/styles/7200_domination.png',
  8200: 'https://raw.communitydragon.org/latest/game/assets/perks/styles/7202_sorcery.png',
  8300: 'https://raw.communitydragon.org/latest/game/assets/perks/styles/7203_whimsy.png',
  8400: 'https://raw.communitydragon.org/latest/game/assets/perks/styles/7204_resolve.png'
}

// HELPER FUNCTIONS ---> USED TO GET DATA FROM SQL DATABASE FROM RIOT API DATA

// maps queue type based on queueId
const mapQueueType = queueId => {
  let str = '';
  // reverse iterate through the array because most queues are high numbers, lower ids are deprecated
  for (let i = queueData.length-1; i >= 0; i--) {
    if (queueId === queueData[i].queueId) {
      str = queueData[i].description;
      str = str.replace(' games', '');
      str = str.replace('5v5 ', '');
      return str;
    }
  }
};

// maps item icons for 1 item for player from ids 
const mapItemIcons = (itemId, itemsData) => {
  if (TREE_STYLES[itemId] !== undefined) {
    return TREE_STYLES[itemId]
  }
  for (let i = 0; i < itemsData.length; i++) {
    if (itemsData[i].id === itemId) {
      let str = itemsData[i].iconPath
      str = str.toLowerCase().replace('/lol-game-data/assets/', '');
      return `https://raw.communitydragon.org/latest/game/${str}`
    }
  }
  return null
}

// maps item icons from match timeline using item ids
const mapItemTimelineIconsTest = items => {
  return items.map((item) => {
    return {
      id: item.itemId,
      path: item.path
    }
  })
}
const mapItemTimelineIcons = async items => {
  // console.log(items, 'items')
  const itemsArr = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      itemsArr.push(items[i][j].itemId);
    }
  }
  const query = `SELECT id, path FROM items WHERE id = any(array[${itemsArr}]);`
  const path = await db.query(query);
  // console.log(path, 'path in item timeline icons')
  // iterate through array of arrays
  // for each index in each array, check if id matches and set corresponding path
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      for (let k = 0; k < path.rows.length; k++) {
        if (items[i][j].itemId === path.rows[k].id) {
          items[i][j].path = path.rows[k].path;
        }
      }
    }
  }
  return items;
};


const getRuneData = (runeId, runesData) => {
  for (let i = 0; i < runesData.length; i++) {
    if (runesData[i].id === runeId) {
      let str = runesData[i].iconPath
      str = str.toLowerCase().replace('/lol-game-data/assets/', '')
      return {
        id: runeId,
        icon: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`
      }
    }
  }
  return {
    id: runeId,
    icon: EMPTY_ICON
  }
}

// maps rune icons for keystone and secondary tree from ids from SQL DB
const mapRuneIcons = (runeId, runesData) => {
  for (let i = 0; i < runesData.length; i++) {
    if (runesData[i].id === runeId) {
      let str = runesData[i].iconPath
      str = str.toLowerCase().replace('/lol-game-data/assets/', '')
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`
    }
  }
  return null
}

const mapSummonerIcons = (summSpellId, summSpellData) => {
  for (let i = 0; i < summSpellData.length; i++) {
    if (summSpellData[i].id === summSpellId) {
      let str = summSpellData[i].iconPath
      str = str.toLowerCase().replace('/lol-game-data/assets/', '');
      return `https://raw.communitydragon.org/latest/game/${str}`
    }
  }
}

// maps summoner spell icons from ids from SQL DB
const mapSummonerIconsTemp = async summSpells => {
  const query = `SELECT path FROM summonerspells WHERE id = any(array[${summSpells}])
  ORDER BY CASE id
  WHEN ${summSpells[0]} then 1
  WHEN ${summSpells[1]} then 2
  end;`

  const path = await db.query(query);
  return [path.rows[0].path, path.rows[1].path];
};

// inits a region Obj to assign a platform routing value based on user inputted region
const regionObj = {
  "br1": "americas",
  "eun1": "europe",
  "euw1": "europe",
  "jp1": "asia",
  "kr": "asia",
  "la1": "americas",
  "la2": "americas",
  "na1": "americas",
  "oc1": "americas",
  "ru": "europe",
  "tr1": "europe",
};

// checks whether summoner currently has data in database
summonerController.checkSummData = async (req, res, next) => {
  const { summonerName, regionId } = req.params;
  try {
    const summoner = await lolSummoner.findOne({"summonerName": { "$regex" : new RegExp(summonerName, "i")}, "region": regionId});
    if (summoner !== null) {
      res.locals.summonerData = {
        summonerName: summoner.summonerName,
        summonerLevel: summoner.summonerLevel,
        summonerRank: summoner.summonerRank,
        puuid: summoner.puuid,
        region: summoner.region,
        summonerId: summoner.summonerId,
        accountId: summoner.accountId,
        profileIcon: summoner.profileIcon,
        matchHistory: summoner.matchHistory,
        otherPlayersMatches: summoner.otherPlayersMatches,
        allMatchesPlayed: summoner.MatchesPlayed,
        allMatchesPlayedData: summoner.MatchesPlayedData,
        lastUpdated: summoner.lastUpdated,
      };
      return next();
    }
    return next(); 
  }
  catch(err) {
    console.log('err in checkSummData');
    return next(err);
  }
};

// if no summoner data is found in checkSummData or if update button is pressed
summonerController.updateSummData = async (req, res, next) => {
  const { summonerName, regionId } = req.params;
  const regionRoute = regionObj[regionId];

  // checks if res.locals.summonerData exists, if it does then just skips this controller -
  // determined by whethefr the user pressed 'search' or 'update'
  if (res.locals.summonerData) {
    return next();
  }

  try {
    const responseSummData = await axios.get(`https://${regionId}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}?api_key=${process.env.api_key}`, 
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
      }
    });

    // gets user's summonerName, puuid, summoner id, and account id from api call
    const { data } = responseSummData;
    const { puuid, id, accountId, name } = data;

    // uses summoner's puuid to get summoner's match history id list of past 20 games to an array
    const responseMatchData = await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    // list of match IDs in an array
    const matchIdList = responseMatchData.data;
    
    // summonerId from first API request used to get rank information
    const summonerId = responseSummData.data.id;
    
    const responseRankData = await axios.get(`https://${regionId}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const rankData = {
      rankedSolo: [],
      rankedFlex: [],
    };
    // checks to see if 1 of the 2 arrays returned are for ranked solo or ranked flex
    for (let i = 0; i < responseRankData.data.length; i++) {
      if (responseRankData.data[i].queueType === "RANKED_SOLO_5x5") {
        rankData.rankedSolo.push(responseRankData.data[i].tier);
        rankData.rankedSolo.push(responseRankData.data[i].leaguePoints);
        rankData.rankedSolo.push(responseRankData.data[i].rank);
        rankData.rankedSolo.push(responseRankData.data[i].wins);
        rankData.rankedSolo.push(responseRankData.data[i].losses);
      }

      if (responseRankData.data[i].queueType === "RANKED_FLEX_SR") {
        rankData.rankedFlex.push(responseRankData.data[i].tier);
        rankData.rankedFlex.push(responseRankData.data[i].leaguePoints);
        rankData.rankedFlex.push(responseRankData.data[i].rank);
        rankData.rankedFlex.push(responseRankData.data[i].wins);
        rankData.rankedFlex.push(responseRankData.data[i].losses);
      }
    }
  
    const matchHistoryData = [];
    const neededObjs = [];

    // check DB for each ID in player's recent matches
    const matchObjs = await lolMatches.find({ matchId: { $in: [...matchIdList]}});

    const set = new Set();
    for (let i = 0; i < matchObjs.length; i++) {
      set.add(matchObjs[i].matchId);
      matchHistoryData.push(matchObjs[i].matchData);
    }

    for (let i = 0; i < matchIdList.length; i++) {
      if (!set.has(matchIdList[i])) neededObjs.push(matchIdList[i]);
    }

    if (neededObjs.length > 0) {
      const gettingMatchObjs = await Promise.allSettled(neededObjs.map(async id => {
        return await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.api_key}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
              "Accept-Language": "en-US,en;q=0.9",
              "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
              "Origin": "https://developer.riotgames.com"
            }
          }
        );
      }));

      for (let i = 0; i < gettingMatchObjs.length; i++) {
        matchHistoryData.push(gettingMatchObjs[i].value.data.info);
      }

      await Promise.allSettled(gettingMatchObjs.map(async obj => {
        if (obj.status !== 'rejected') {
          await lolMatches.create({
            matchId: obj.value.data.metadata.matchId,
            matchData: obj.value.data.info
          });
        }
      }));
    }

    matchHistoryData.sort((a, b) => {
      return ((b.gameEndTimestamp - a.gameEndTimestamp));
    });

    // iterates through the matchHistoryData list to find the summoner being-
    // looked up so you only find their statistics for each match and push an object 
    // with statistics from the last 20 matches 
    const matchesData = [];
    const otherPlayersData = [];
    for (let i = 0; i < matchHistoryData.length; i++) {      
      for (let j = 0; j < matchHistoryData[i].participants.length; j++) {
        if (matchHistoryData[i].participants[j].summonerName === name) {
          const player = matchHistoryData[i].participants[j];
          let gameDuration = matchHistoryData[i].gameDuration;
          // check if timestamp is old timestamp in ms over seconds by checking 
          if (gameDuration > 10000) gameDuration = gameDuration*.001;
          matchesData.push({
            matchId: matchIdList[i],
            gameEnd: matchHistoryData[i].gameEndTimestamp,
            championId: player.championId,
            summonerIcon: player.profileIcon,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            matchLength: `${gameDuration}`,
            gameMode: matchHistoryData[i].queueId,
            champion: player.championName,
            position: player.teamPosition,
            win: player.win,
            visionScore: player.visionScore,
            cs: (player.totalMinionsKilled + player.neutralMinionsKilled),
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk, // keystone [0]
            player.perks.styles[0].selections[1].perk, // first rune in keystone tree [1]
            player.perks.styles[0].selections[2].perk, // second rune in keystone tree [2] 
            player.perks.styles[0].selections[3].perk, // third rune in keystone tree [3]
            player.perks.styles[0].style, // primary tree style [4]
            player.perks.styles[1].style, // secondary tree style (i.e. pic of green tree icon) [5]
            player.perks.styles[1].selections[0].perk, // secondary tree first rune [6]
            player.perks.styles[1].selections[1].perk,  // secondary tree second rune [7]
            player.perks.statPerks.defense, // stat shard row 1 [8]
            player.perks.statPerks.flex, // stat shard row 2 [9]
            player.perks.statPerks.offense], // stat shard row 3 [10]
          });
          otherPlayersData.push({
            matchId: matchIdList[i],
            championId: player.championId,
            champion: player.championName,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            turretKills: player.turretKills,
            barons: player.baronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            position: player.teamPosition,
            visionScore: player.visionScore,
            profileIcon: player.profileIcon,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
        else {
          const player = matchHistoryData[i].participants[j];
          otherPlayersData.push({
            matchId: matchIdList[i],
            championId: player.championId,
            champion: player.championName,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            profileIcon: player.profileIcon,
            turretKills: player.turretKills,
            barons: player.baronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            visionScore: player.visionScore,
            position: player.teamPosition,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
      };
    };

    const gameVersion = await leagueFunctions.getLeagueVersion();
    const itemsData = await leagueFunctions.getItemsData(gameVersion);
    const summSpellData = await leagueFunctions.getSummSpellData(gameVersion);
    const runesData = await leagueFunctions.getRunesData(gameVersion);

    // maps icons for main player being searched for
    for (let i = 0; i < matchesData.length; i++) {
      const itemIcons = matchesData[i].items.map((item) => {
        const itemIcon = mapItemIcons(item, itemsData);
        return itemIcon === null ? 
          EMPTY_ICON
          :
          itemIcon
      });
      const summSpellIcons = matchesData[i].summonerSpells.map((summSpell) => {
        const summSpellIcon = mapSummonerIcons(summSpell, summSpellData);
        return summSpellIcon === null ?
          EMPTY_ICON
          :
          summSpellIcon
      });
      const runeIcons = matchesData[i].runes.map((rune) => {
        const runeIcon = mapRuneIcons(rune, runesData);
        return runeIcon === null ? { id: rune, icon: EMPTY_ICON } : { id: rune, icon: runeIcon }
      });

      // const runesMap = mapRuneIcons(matchesData[i].runes, runesData); // 11 runes total
      const queueMap = mapQueueType(matchesData[i].gameMode);

      matchesData[i].gameMode = queueMap;
      matchesData[i].items = itemIcons;
      matchesData[i].runes = runeIcons;
      matchesData[i].summonerSpells = summSpellIcons;

    }

    let allMatchesArr = [];

    try {
      for (let i = 0; i < 2000; i+=100) {
        // gets players last 1000 ranked soloq match ids from riot api
        // &endTime=1668470399
        const getRankedMatches = await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=1673438400&queue=420&type=ranked&start=${i}&count=100&api_key=${process.env.api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          }
        });

        const { data } = getRankedMatches;
        allMatchesArr.push(data);
        // ONCE WE HIT LENGTH !== 100, WE HAVE FOUND ALL OF THEIR RECENT MATCHES OR MOST RECENT 1000
        if (data.length !== 100) {
          // flatten the array of arrays of new recent ranked matches from their recent 1000
          allMatchesArr = allMatchesArr.flat();
          
          // check DB for summoner name
          const summoner = await lolSummoner.findOne({summonerName: name, region: regionId});
          // if they exist in the DB, we want to preserve their OLD match ids along with new ones
          if (summoner !== null) {
            const oldMatchIds = summoner.MatchesPlayed.flat();
  
            // create a new set of summoner's NEW match IDs 
            const newMatchIdsSet = new Set(allMatchesArr);
  
            /*
            iterate through the OLD match id list, checking if those match
            ids exist in the new set list - if they don't, add them to the new id list array
            */
            for (let i = 0; i < oldMatchIds.length; i++) {
              if (!newMatchIdsSet.has(oldMatchIds[i])) {
                allMatchesArr.push(oldMatchIds[i]);
              }
            }
            break;
          }
          else {
            break;
          }
        }
      }
    }
    catch(err) {
      console.log('err in getting all  ranked matches');
      return next(err);
    }

    // summoner data to send back to front end as response
    const summonerData = {
      summonerName: name,
      summonerLevel: responseSummData.data.summonerLevel,
      summonerRank: rankData,
      puuid: puuid,
      summonerId: id,
      accountId: accountId,
      matchHistory: matchesData,
      region: regionId,
      profileIcon: responseSummData.data.profileIconId,
      otherPlayersMatches: otherPlayersData,
      allMatchesPlayed: allMatchesArr,
      allMatchesPlayedData: [],
      lastUpdated: Date.now(),
    };

    // checks mongo DB if summoner exists
    const summoner = await lolSummoner.findOne({summonerName: name, region: regionId});

    // if summoner is null, aka does not exist, create new entry
    if (summoner === null) {
      await lolSummoner.create({
        summonerName: name,
        summonerRank: rankData,
        summonerLevel: responseSummData.data.summonerLevel,
        profileIcon: responseSummData.data.profileIconId,
        matchHistory: matchesData,
        otherPlayersMatches: otherPlayersData,
        MatchesPlayed: allMatchesArr,
        puuid: puuid,
        region: regionId,
        summonerId: id,
        accountId: accountId,
        lastUpdated: Date.now(),
      });
    }
    // if summoner is not null, they exist - so update existing entry
    else {
      await lolSummoner.findOneAndUpdate({summonerName: summonerName, region: regionId},
        { 
          $set: {
            summonerName: name,
            summonerRank: rankData,
            summonerLevel: responseSummData.data.summonerLevel,
            profileIcon: responseSummData.data.profileIconId,
            matchHistory: matchesData,
            otherPlayersMatches: otherPlayersData,
            MatchesPlayed: allMatchesArr,
            puuid: puuid,
            summonerId: id,
            accountId: accountId,
            region: regionId,
            lastUpdated: Date.now(),
          }
        }
      );
    }
    res.locals.summonerData = summonerData;
    return next();
  }
  catch(err) {
    console.log('err in summonerController at summData');
    return next(err);
  }
};

// get match objects and data from each to send back to front end
summonerController.addSummMatchesData = async (req, res, next) => {

  const { summonerName, allMatchesPlayed, region } = res.locals.summonerData;
  const regionRoute = regionObj[region];

  try {
    const summoner = await lolSummoner.findOne({"summonerName": { "$regex" : new RegExp(summonerName, "i")}, "region": region});
    // function to extract data from match objects for the specific player
    const getObjData = (arrayOfObjs, summonerName, puuid) => {
      const tempArr = [];
      for (let i = 0; i < arrayOfObjs.length; i++) {
        if (arrayOfObjs[i] !== undefined) {
          for (let j = 0; j < arrayOfObjs[i].participants.length; j++) {
            // check if summoner's summoner name matches or their puuid
            if ((arrayOfObjs[i].participants[j].summonerName).toLowerCase() === summonerName.toLowerCase() || arrayOfObjs[i].participants[j].puuid === puuid) {
              const player = arrayOfObjs[i].participants[j];
              tempArr.push({
                championName: player.championName,
                championId: player.championId,
                champDamage: player.totalDamageDealtToChampions,
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                cs: (player.totalMinionsKilled + player.neutralMinionsKilled),
                csPerMin: (player.totalMinionsKilled + player.neutralMinionsKilled)/(arrayOfObjs[i].gameDuration/60),
                win: player.win,
                position: player.teamPosition,
                gold: player.goldEarned,
                damageTaken: player.totalDamageTaken,
                doubleKills: player.doubleKills,
                tripleKills: player.tripleKills,
                quadraKills: player.quadraKills,
                pentaKills: player.pentaKills, 
              });
            }
          }
        }
      }
      return tempArr;
    };

    // arr to combine array of arrays together
    const tempArr = allMatchesPlayed.flat();
    const objs = await lolMatches.find({ matchId: { $in: [...tempArr]}});

    const set = new Set();
    for (let i = 0; i < objs.length; i++) {
      set.add(objs[i].matchId);
    }

    const neededObjs = [];
    for (let i = 0; i < tempArr.length; i++) {
      if (!set.has(tempArr[i])) neededObjs.push(tempArr[i]);
    }

    let newObjs = objs.map(matchObj => {
      return matchObj.matchData;
    });
    if (neededObjs.length > 0) {
      const objects = await Promise.allSettled(neededObjs.map(async id => {
        return await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          }
        });
      }));

      const objData = await Promise.allSettled(objects.map(async obj => {
        if (obj.status !== 'rejected') {
          await lolMatches.create({
            matchId: obj.value.data.metadata.matchId,
            matchData: obj.value.data.info
          });
          return obj.value.data.info;
        }
      }));

      const newObjData = objData.map(matchObj => {
        return matchObj.value;
      });
      newObjs = newObjs.concat(newObjData);
    }
    // console.log(summoner.puuid, 'puuid');
    const MatchesInfoArr = getObjData(newObjs, summonerName, summoner.puuid);
    await lolSummoner.findOneAndUpdate({summonerName: summonerName, region: region}, {MatchesPlayedData: MatchesInfoArr});
    res.locals.summonerData.allMatchesPlayedData = MatchesInfoArr;
    return next();
  }
  catch(err) {
    console.log('err in adding summoner data');
    return next(err);
  }
};

// gets dropdown box data when dropdownbox is clicked
summonerController.getDDBoxSummData = async (req, res, next) => {
  try {
    const { otherPlayers, matchId, puuid, regionId, championId } = req.body;
    const regionRoute = regionObj[regionId];

    // helper function to parse through timeline and get relevant timeline info
    const getTimelineData = timeline => {
      // init player Id & output object containing item timeline info and skill level up info
      let playerId = 0;
      // iterate through match players to find current player id by matching puuid
      for (let i = 0; i < timeline.participants.length; i++) {
        if (timeline.participants[i].puuid === puuid) {
          playerId = timeline.participants[i].participantId;
        }
      }

      // init arrays to push different events to
      const itemTimelineArr = [];
      const skillLevelsArr = [];

      // each match timeline has X frames for the length of the game 
      // (i.e. if a game is 25 mins long & the frame interval is 1 min, there would be 26 frames)
      for (let i = 0; i < timeline.frames.length; i++) {
        // init tempArr for item timeline frames
        const tempItemArr = [];
        // for each frame, iterate through the events array to find events for current player
        // there are different event types that can occur?? (i.e. ITEM_PURCHASED, LEVEL_UP, )
        for (let j = 0; j < timeline.frames[i].events.length; j++) {
          // check if the event corresponds to correct player
          if (timeline.frames[i].events[j].participantId === playerId) {
            // if it does, check the type and push to respective array
            if (timeline.frames[i].events[j].type === "ITEM_PURCHASED" || timeline.frames[i].events[j].type === "ITEM_SOLD") {
              tempItemArr.push(timeline.frames[i].events[j]);
            }
            else if (timeline.frames[i].events[j].type === "SKILL_LEVEL_UP" && timeline.frames[i].events[j].participantId === playerId) {
              skillLevelsArr.push(timeline.frames[i].events[j]);
            }
          }
        }
        itemTimelineArr.push(tempItemArr);
      }
      // return object containing both arrays
      return {
        itemTimeline: itemTimelineArr,
        skillLevels: skillLevelsArr,
      };
    };

    const getMatchTimeline = await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });
    
    const matchTimeline = getMatchTimeline.data.info;

    const timelineData = getTimelineData(matchTimeline);

    const gameVersion = await leagueFunctions.getLeagueVersion();
    const itemsData = await leagueFunctions.getItemsData(gameVersion);
    const summSpellData = await leagueFunctions.getSummSpellData(gameVersion);
    const runesData = await leagueFunctions.getRunesData(gameVersion);
    
    for (let i = 0; i < otherPlayers.length; i++) {

      const itemIcons = otherPlayers[i].items.map((item) => {
        const itemIcon = mapItemIcons(item, itemsData);
        return itemIcon === null ? 
          EMPTY_ICON
          :
          itemIcon
      });
      const summSpellIcons = otherPlayers[i].summonerSpells.map((summSpell) => {
        const summSpellIcon = mapSummonerIcons(summSpell, summSpellData);
        return summSpellIcon === null ?
          EMPTY_ICON
          :
          summSpellIcon
      });
      const runeIcons = otherPlayers[i].runes.map((rune) => {
        const runeIcon = mapRuneIcons(rune, runesData);
        return runeIcon === null ? { id: rune, icon: EMPTY_ICON } : { id: rune, icon: runeIcon }
      });

      const itemTimelineMap = await mapItemTimelineIcons(timelineData.itemTimeline);
      
      timelineData.itemTimeline = itemTimelineMap;
      otherPlayers[i].items = itemIcons;
      otherPlayers[i].runes = runeIcons;
      otherPlayers[i].summonerSpells = summSpellIcons;
    }

    const championAbilityIcons = leagueFunctions.getChampAbilityIcons(championId);

    res.locals.DDBoxData = {
      otherPlayers: otherPlayers,
      timelineData: timelineData,
      championAbilityIcons: championAbilityIcons,
    };
    return next();
  }
  catch(err) {
    console.log('err in getDDBoxSummData');
    return next(err);
  }
};

// gets user's current live game data
summonerController.getLiveGameData = async (req, res, next) => {
  try {
    const { summonerName, regionId } = req.params;
    // const regionRoute = regionObj[regionId];

    // gets users encrypted summoner id from summoner name, needed to make next api call for live game
    const getEncryptedId = await axios.get(`https://${regionId}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });
    const { id } = getEncryptedId.data;

    // request to get user's live game data using their encrypted summoner id
    const getLiveGameData = await axios.get(`https://${regionId}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });
    const { data } = getLiveGameData;
    
    const queueMap = mapQueueType(data.gameQueueConfigId, queueData);

    // extract all 10 players encrypted summoner ids from response and send request to league-v4 to get rank data
    const playerInfoArr = [];
    for (let i = 0; i < data.participants.length; i++) {
      const player = data.participants[i];
      const newObj = {};
      const getRankData = await axios.get(`https://${regionId}.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.participants[i].summonerId}?api_key=${process.env.api_key}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://developer.riotgames.com"
        }
      });

      for (let i = 0; i < getRankData.data.length; i++) {
        if (getRankData.data[i].queueType === "RANKED_SOLO_5x5") {
          newObj.tier = getRankData.data[i].tier;
          newObj.division = getRankData.data[i].rank;
          newObj.lp = getRankData.data[i].leaguePoints;
          newObj.wins = getRankData.data[i].wins;
          newObj.losses = getRankData.data[i].losses;
        }
      }
      newObj.summonerName = player.summonerName;
      
      const summSpellMap = await mapSummonerIconsTemp([player.spell1Id, player.spell2Id]); // 2 items total
      const gameVersion = await leagueFunctions.getLeagueVersion();
      const runesData = await leagueFunctions.getRunesData(gameVersion);
      // inserting runes in format of -> keystone, primary runes 1-2-3, 
      // primary tree style, secondary tree style, secondary runes 1-2, shards 1-2-3
      const runes = [
        player.perks.perkIds[0],
        player.perks.perkIds[1],
        player.perks.perkIds[2],
        player.perks.perkIds[3],
        player.perks.perkStyle,
        player.perks.perkSubStyle,
        player.perks.perkIds[4],
        player.perks.perkIds[5],
        player.perks.perkIds[8],
        player.perks.perkIds[7],
        player.perks.perkIds[6],
      ]
      const runeIcons = runes.map((rune) => {
        const runeIcon = mapRuneIcons(rune, runesData);
        return runeIcon === null ? { id: rune, icon: EMPTY_ICON } : { id: rune, icon: runeIcon }
      });

      newObj.summonerSpells = summSpellMap;
      newObj.championId = player.championId;
      newObj.runes = runeIcons;
      newObj.team = player.teamId;
      playerInfoArr.push(newObj);
    }

    const liveGameData = {
      queueType: queueMap,
      bans: data.bannedChampions,
      region: data.platformId,
      playerInfo: playerInfoArr,
    };
    res.locals.liveGameData = liveGameData;
    return next();
  }
  catch(err) {
    console.log('err in getLiveGameData');
    return next(err);
  }
};

// gets summoner's next matches in their history 
summonerController.expandSummMatchHistory = async (req, res, next) => {
  const { summonerName, historyLength, regionId } = req.params;
  // console.log(summonerName, 'summonerName');
  // console.log(historyLength, 'history length');
  // console.log(regionId, 'region id');
  const regionRoute = regionObj[regionId];

  try {
    // connect to DB to find summoner's puuid
    const summoner = await lolSummoner.findOne({"summonerName": { "$regex" : new RegExp(summonerName, "i")}, "region": regionId});
    const { puuid } = summoner;

    const matchHistoryData = [];
    const neededObjs = [];
    // uses summoner's puuid to get summoner's match history id list of past 20 games to an array
    const responseMatchData = await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${historyLength}&count=20&api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const matchIdList = responseMatchData.data;
    // check DB for each ID in player's recent matches
    const matchObjs = await lolMatches.find({ matchId: { $in: [...matchIdList]}});

    const set = new Set();
    // iterate through the match objs that we found and add them to new set and push their data to matchhistorydata array
    for (let i = 0; i < matchObjs.length; i++) {
      set.add(matchObjs[i].matchId);
      matchHistoryData.push(matchObjs[i].matchData);
    }

    // iterate through the match id list and see if they exist in the set
    for (let i = 0; i < matchIdList.length; i++) {
      if (!set.has(matchIdList[i])) neededObjs.push(matchIdList[i]);
    }

    if (neededObjs.length > 0) {
      const gettingMatchObjs = await Promise.allSettled(neededObjs.map(async id => {
        return await axios.get(`https://${regionRoute}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.api_key}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
              "Accept-Language": "en-US,en;q=0.9",
              "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
              "Origin": "https://developer.riotgames.com"
            }
          }
        );
      }));

      for (let i = 0; i < gettingMatchObjs.length; i++) {
        matchHistoryData.push(gettingMatchObjs[i].value.data.info);
      }

      await Promise.allSettled(gettingMatchObjs.map(async obj => {
        if (obj.status !== 'rejected') {
          await lolMatches.create({
            matchId: obj.value.data.metadata.matchId,
            matchData: obj.value.data.info
          });
        }
      }));
    }

    matchHistoryData.sort((a, b) => {
      return ((b.gameEndTimestamp - a.gameEndTimestamp));
    });

        // iterates through the matchHistoryData list to find the summoner being-
    // looked up so you only find their statistics for each match and push an object 
    // with statistics from the last 20 matches 
    const matchesData = [];
    const otherPlayersData = [];
    for (let i = 0; i < matchHistoryData.length; i++) {      
      for (let j = 0; j < matchHistoryData[i].participants.length; j++) {
        if (matchHistoryData[i].participants[j].puuid === puuid) {
          const player = matchHistoryData[i].participants[j];
          matchesData.push({
            matchId: matchIdList[i],
            gameEnd: matchHistoryData[i].gameEndTimestamp,
            championId: player.championId,
            summonerIcon: player.profileIcon,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            matchLength: `${matchHistoryData[i].gameDuration}`,
            gameMode: matchHistoryData[i].queueId,
            champion: player.championName,
            position: player.teamPosition,
            win: player.win,
            visionScore: player.visionScore,
            cs: (player.totalMinionsKilled + player.neutralMinionsKilled),
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk, // keystone [0]
            player.perks.styles[0].selections[1].perk, // first rune in keystone tree [1]
            player.perks.styles[0].selections[2].perk, // second rune in keystone tree [2] 
            player.perks.styles[0].selections[3].perk, // third rune in keystone tree [3]
            player.perks.styles[0].style, // primary tree style [4]
            player.perks.styles[1].style, // secondary tree style (i.e. pic of green tree icon) [5]
            player.perks.styles[1].selections[0].perk, // secondary tree first rune [6]
            player.perks.styles[1].selections[1].perk,  // secondary tree second rune [7]
            player.perks.statPerks.defense, // stat shard row 1 [8]
            player.perks.statPerks.flex, // stat shard row 2 [9]
            player.perks.statPerks.offense], // stat shard row 3 [10]
          });
          otherPlayersData.push({
            matchId: matchIdList[i],
            championId: player.championId,
            champion: player.championName,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            turretKills: player.turretKills,
            barons: player.baronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            position: player.teamPosition,
            visionScore: player.visionScore,
            profileIcon: player.profileIcon,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
        else {
          const player = matchHistoryData[i].participants[j];
          otherPlayersData.push({
            matchId: matchIdList[i],
            championId: player.championId,
            champion: player.championName,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            profileIcon: player.profileIcon,
            turretKills: player.turretKills,
            barons: player.baronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            visionScore: player.visionScore,
            position: player.teamPosition,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
      };
    };

    const gameVersion = await leagueFunctions.getLeagueVersion();
    const itemsData = await leagueFunctions.getItemsData(gameVersion);
    const summSpellData = await leagueFunctions.getSummSpellData(gameVersion);
    
    // maps icons for main player being searched for
    for (let i = 0; i < matchesData.length; i++) {
      const itemIcons = matchesData[i].items.map((item) => {
        const itemIcon = mapItemIcons(item, itemsData);
        return itemIcon === null ? 
          EMPTY_ICON
          :
          itemIcon
      });

      const summSpellIcons = matchesData[i].summonerSpells.map((summSpell) => {
        const summSpellIcon = mapSummonerIcons(summSpell, summSpellData);
        return summSpellIcon === null ?
          EMPTY_ICON
          :
          summSpellIcon
      });
      // const itemsMap = await mapItemIcons(matchesData[i].items); // 7 items total
      const runesMap = await mapRuneIcons(matchesData[i].runes); // 11 runes total
      const queueMap = mapQueueType(matchesData[i].gameMode);

      matchesData[i].gameMode = queueMap;
      // matchesData[i].items = itemsMap;
      matchesData[i].items = itemsArr
      matchesData[i].runes = runesMap;
      matchesData[i].summonerSpells = summSpellIcons;
    }

    res.locals.newSummMatchHistory = {
      matchesData: matchesData,
      otherPlayersMatches: otherPlayersData
    };
    return next();
  }
  catch(err) {
    console.log('err in expand summ match history');
    return next(err);
  }
};

module.exports = summonerController;