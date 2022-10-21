const ItemsBox = props => {

  const { played, icon } = props;

  return (
    <div className="RecentItemsBox">
      <img id="r10item" src={icon} />
      <p>{played} Games</p>
    </div>
  );
};

export default ItemsBox;