import React from 'react';

const SkillBox = props => {
  const { id } = props;
  return (
    <div className="skill-box" id={`skill-box-${id}`}>{id}</div>
  );
};

export default SkillBox;