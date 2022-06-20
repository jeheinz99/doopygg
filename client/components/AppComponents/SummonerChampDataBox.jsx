import React from "react";
import { useSelector } from "react-redux";

const SummonerChampDataBox = () => {

  const summonerName = useSelector(state => state.summoners.summonerName);
  // const summonerDBData = useSelector(state => state.summoners.summonerDBData);


  // const dataObj = {};
  // for (let i = 0; i < summonerDBData[matchesData].length; i++) {
  //   for (let j = 0; j < 10; j++) {
  //     if (summonerDBData[matchesData][i].participants[j].summonerName === summonerName) {
      //   const player = summonerDBData[matchesData][i].participants[j];
        
      // }
  //   }
  // }

  return (
    <div className="testdiv">
      hello
    </div>
  );

};

export default SummonerChampDataBox;