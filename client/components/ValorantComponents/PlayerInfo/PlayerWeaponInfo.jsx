import { useState } from "react";
import WeaponBox from "./WeaponBox";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const PlayerWeaponInfo = props => {

  const { weaponData } = props;
  const [open, setOpen] = useState(false);

  const weaponsArr = [];
  for (let weapon in weaponData) {
    weaponsArr.push({
      id: weapon,
      name: weaponData[weapon].weaponName,
      kills: weaponData[weapon].kills,
      icon1: weaponData[weapon].icon1,
      icon2: weaponData[weapon].icon2,
    });
  }
  const sortedWeapons = weaponsArr.sort((a, b) => (b.kills - a.kills));

  const topWeaponsArr = [];
  const allWeaponsArr = [];
  for (let i = 0; i < sortedWeapons.length; i++) {
    const weapon = sortedWeapons[i];
    if (topWeaponsArr.length < 3) {
      topWeaponsArr.push(
        <WeaponBox
        key={`top-weapons-${i}`} 
        name={weapon.name}
        kills={weapon.kills}
        icon1={weapon.icon1}
        icon2={weapon.icon2}
      />)
    }
    allWeaponsArr.push(
      <WeaponBox 
      key={`all-weapons-${i}`}
      name={weapon.name}
      kills={weapon.kills}
      icon1={weapon.icon1}
      icon2={weapon.icon2}
    />)
  }

  return (
    <div className="PlayerWeaponInfo">
      <div className="weapons-header">
        <img className="" src={""} />
        <h3> Top Weapons </h3>
      </div>

      {!open && <div className="WeaponsList">{topWeaponsArr}</div>}
      {open && <div className="WeaponsList">{allWeaponsArr}</div>}

      {open &&
      <div className="dd-button-div" id="weapon-up-btn">
        <button className="val-dd-button" onClick={() => setOpen(!open)}> 
          <AiFillCaretUp color={'white'}/> 
        </button>
      </div>
      }
      {!open && 
      <div className="dd-button-div" id="weapon-down-btn">
        <button className="val-dd-button" onClick={() => setOpen(!open)}> 
          <AiFillCaretDown color={'white'}/> 
        </button>
      </div>
      }
    </div>
  );
};

export default PlayerWeaponInfo;