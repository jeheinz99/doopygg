const Tooltip = (props) => {

  const { tooltipType, tooltipContent, width, contentClassName, content, leftPercent } = props;
  let contentClass;
  let tooltipWidth;
  (contentClassName === "" ? contentClass = "default-tooltip-content" : contentClass = contentClassName);
  (width === "" ? tooltipWidth = "120px" : tooltipWidth = width);

  return (
    <div className="tooltip">
      <p className="tooltiptext" style={{width: `${tooltipWidth}`, left: `${leftPercent}%`}}> {tooltipContent} </p>
      {tooltipType === "text" && <p className={`${contentClass}`}> {content} </p>}
      {tooltipType === "image" && <img className={`${contentClass}`} src={content}/>}
    </div>
  );
};

export default Tooltip;