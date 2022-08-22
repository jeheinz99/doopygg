import React from 'react';

const SkillBox = props => {
  const { id, level } = props;
  return (
    <div className="skill-box" id={id}>{level}</div>
  );
};

export default SkillBox;