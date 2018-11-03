import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import CloseIcon from '@material-ui/icons/Close';

const ReplayButton = ({ disabled, onClick, children }) => (
  <Button size="small" variant="raised" color="secondary" onClick={onClick} disabled={disabled}>
    {children}
  </Button>
);

ReplayButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

ReplayButton.defaultProps = {
  disabled: false,
};

const ReplayControls = (props) => {
  if (props.replaySpeed === null) return null;

  return (
    <div className="replay-controls">
      <ReplayButton onClick={props.onBackToStart}>
        <FirstPageIcon />
      </ReplayButton>
      <ReplayButton disabled={props.replaySpeed === 0} onClick={props.onPause}>
        <PauseIcon />
      </ReplayButton>
      <ReplayButton disabled={props.replaySpeed === 1} onClick={props.onPlay}>
        <PlayArrowIcon />
      </ReplayButton>
      <ReplayButton onClick={() => props.onFastForward((props.replaySpeed || 1) * 2)}>
        <FastForwardIcon />
      </ReplayButton>
      <ReplayButton onClick={props.onLeaveReplayMode}>
        <CloseIcon />
      </ReplayButton>
    </div>
  );
};

ReplayControls.defaultProps = {
  replaySpeed: 0,
};

ReplayControls.propTypes = {
  replaySpeed: PropTypes.number,
  onBackToStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onFastForward: PropTypes.func.isRequired,
  onLeaveReplayMode: PropTypes.func.isRequired,
};

export default ReplayControls;
