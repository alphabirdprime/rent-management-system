import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.scss';

const style = {
  margin: '0px',
  position: 'absolute',
  top: '50%',
  left: '50%',
};

function View() {
  return (
    <div className="loading-overlay-div">
      <div className="loading-center-wrapper">
        <CircularProgress style={style} color="primary" />
      </div>
    </div>
  );
}
export default View;
