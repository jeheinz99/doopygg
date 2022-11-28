import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValorantData } from '../actions/actions.js';
import { SiRiotgames } from 'react-icons/si';
import { BiSearch } from 'react-icons/bi';
import cypher from '../assets/cypher.png';
import jett from '../assets/jett.png';
import PlayerStatsContainer from '../components/ValorantComponents/PlayerStatsContainer';

const link = 'https://auth.riotgames.com/authorize?redirect_uri=http://www.doopy.dev/riot/auth/callback&client_id=doopygg&response_type=code&scope=openid';

const ValorantPageContainer = () => {

  const matchHistory = useSelector(state => state.valorant.matchHistory);
  console.log(matchHistory);

  const dispatch = useDispatch();

  let riotIdInput;
  const riotIdData = e => {
    riotIdInput = e.target.value;
    return riotIdInput;
  };

  let taglineInput;
  const taglineData = e => {
    taglineInput = e.target.value;
    return taglineInput;
  };

  const getCookie = name => {
    const escape = s => { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  };

  const searchValData = () => {
    // dispatch(getValorantData(riotIdInput, taglineInput));
  };

  // const testButton = () => {
  //   dispatch(getValorantData('doopy', 'gap'));
  // }

  const signOutFunc = async () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }  
  };

  useEffect(() => {
    const input1 = document.getElementById('val-input-1');
    const input2 = document.getElementById('val-input-2');
    const enterKeyFunc = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault;
        document.getElementById('ValorantBoxButton').click();
      }
    };
    input1.addEventListener('keypress', enterKeyFunc);
    input2.addEventListener('keypress', enterKeyFunc);
    return () => {
      input1.removeEventListener('keypress', enterKeyFunc);
      input2.removeEventListener('keypress', enterKeyFunc);
    }
  }, []);

  if (document.cookie) {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
  }
  
  return (
    <div className="ValorantPageBox">
      <div className="OuterSearchBox" id="welcomeValorant"> 
        <div id="welcome-valorant"> 
          <h3>doopy.gg <span>VALORANT</span></h3>
        </div>
        <div className="ValorantSearchBox">
          <img id="cypher" src={cypher}/>

          <div className="val-searchbox-div1">
            <p id="in-dev"> [in development] </p>

            <div className="val-searchbox-div2">
              <input className="ValBoxInput" id="val-input-1" placeholder="Riot ID" onChange={ riotIdData } required></input>
              <p id="hash"> # </p>
              <input className="ValBoxInput" id="val-input-2" placeholder="Tag-line" onChange={ taglineData } required></input>
              <button id="ValorantBoxButton" onClick={() => searchValData()}> <BiSearch id="SearchIcon"/> </button>
              {/* <button id="temp-button" onClick={() => testButton()}> test button </button> */}
            </div>
            {!document.cookie ? 
            <a id="Riot-Sign-On" href={link}><SiRiotgames />Sign In</a>
            :
            <button id="Riot-Sign-Out" onClick={() => signOutFunc()}>Sign Out</button>
            }
            <p id="RSO-warning"> Signing in with Riot allows doopy.gg access to your stats and makes your profile public. </p>
          </div>

          <img id="jett" src={jett}/>
        </div>
        {/* {document.cookie && matchHistory.length > 0 &&  */}
          <PlayerStatsContainer matchHistory={matchHistory}/>
        {/* } */}
      </div>
    </div>
  );
};

export default ValorantPageContainer;