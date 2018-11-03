import { connect } from 'react-redux';
import { setReplayBackToStart, setReplaySpeed, leaveReplayMode } from '../actions';
import ReplayControls from '../components/ReplayControls';

const mapStateToProps = state => ({
  replaySpeed: state.replayingPlane ? state.replayingPlane.replaySpeed : null,
});

const mapDispatchToProps = dispatch => ({
  onBackToStart: plane => dispatch(setReplayBackToStart(plane)),
  onPause: () => dispatch(setReplaySpeed(0)),
  onPlay: () => dispatch(setReplaySpeed(1)),
  onFastForward: newSpeed => dispatch(setReplaySpeed(newSpeed)),
  onLeaveReplayMode: () => dispatch(leaveReplayMode()),
});

const PlaneReplayControls = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReplayControls);

export default PlaneReplayControls;
