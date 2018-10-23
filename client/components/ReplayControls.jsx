import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import CloseIcon from '@material-ui/icons/Close';

const ReplayControls = (props) => {
  if (!props.areControlsVisible) return null;

  return (
    <div className="replay-controls">
      <Button size="small" variant="raised" color="secondary" onClick={props.onBackToStart}>
        <FirstPageIcon />
      </Button>
      <Button size="small" variant="raised" color="secondary" disabled={props.speed === 0} onClick={props.onPause}>
        <PauseIcon />
      </Button>
      <Button size="small" variant="raised" color="secondary" disabled={props.speed === 1} onClick={props.onPlay}>
        <PlayArrowIcon />
      </Button>
      <Button size="small" variant="raised" color="secondary" onClick={() => props.onFastForward((props.speed || 1) * 2)}>
        <FastForwardIcon />
      </Button>
      <Button size="small" variant="raised" color="secondary" onClick={props.onLeaveReplayMode}>
        <CloseIcon />
      </Button>
    </div>
  );
};

ReplayControls.defaultProps = {
  speed: 0,
  areControlsVisible: false,
};

ReplayControls.propTypes = {
  speed: PropTypes.number,
  areControlsVisible: PropTypes.bool,
  onBackToStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onFastForward: PropTypes.func.isRequired,
  onLeaveReplayMode: PropTypes.func.isRequired,
};

export default ReplayControls;
