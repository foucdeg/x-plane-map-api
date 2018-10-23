import { connect } from 'react-redux';
import { setReplayBackToStart, setReplaySpeed, leaveReplayMode } from '../actions';
import ReplayControls from '../components/ReplayControls';

const mapStateToProps = state => state.replayControls || {};

const mapDispatchToProps = dispatch => ({
  onBackToStart: () => dispatch(setReplayBackToStart()),
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
