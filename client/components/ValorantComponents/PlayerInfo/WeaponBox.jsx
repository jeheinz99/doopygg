const WeaponBox = props => {

  const { name, kills, icon1, icon2 } = props;

  return (
    <div className="WeaponBox">
      <img className="weapon-icon" src={icon2} />
      <p> {name} </p>
      <p> {kills} Kills </p>
    </div>
  );
};

export default WeaponBox;