import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  // add state here
});


const SearchBox = props => {

    return (
      <div className="SearchBox">
        <h1>Welcome</h1>
      </div>
    );

};

export default connect(mapStateToProps, null)(SearchBox);