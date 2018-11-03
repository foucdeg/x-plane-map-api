import { combineReducers } from 'redux';
import * as actions from './actions';
import { mergePlaneData, togglePlaneTrace, clearPlaneTrace, renamePlane, changePlaneIcon } from './helpers';
import { refreshReplay, resetPlaneToInitialPosition } from './replay-helpers';

const followedPlane = (state = null, action) => {
  switch (action.type) {
    case actions.SET_ACTIVE_PLANE:
      return action.key;
    case actions.RECEIVE_PLANES:
      if (Object.keys(action.planes).length === 1 && state === null) {
        return Object.keys(action.planes)[0];
      }
      return state;
    default:
      return state;
  }
};

const planes = (state = [], action) => {
  switch (action.type) {
    case actions.RECEIVE_PLANES:
      return mergePlaneData(state, action.planes);
    case actions.TOGGLE_TRACE:
      return togglePlaneTrace(state, action.key);
    case actions.CLEAR_TRACE:
      return clearPlaneTrace(state, action.key);
    case actions.RENAME_PLANE:
      return renamePlane(state, action.key, action.name);
    case actions.CHANGE_ICON:
      return changePlaneIcon(state, action.key, action.icon);
    default:
      return state;
  }
};

const replayingPlane = (state = null, action) => {
  switch (action.type) {
    case actions.ENTER_REPLAY_MODE:
      return resetPlaneToInitialPosition(action.payload);
    case actions.SET_REPLAY_BACK_TO_START:
      return resetPlaneToInitialPosition(state);
    case actions.LEAVE_REPLAY_MODE:
      return null;
    case actions.REFRESH_REPLAY:
      return refreshReplay(state);
    case actions.SET_REPLAY_SPEED:
      return { ...state, replaySpeed: action.speed };
    default:
      return state;
  }
};

export default combineReducers({
  planes,
  followedPlane,
  replayingPlane,
});
