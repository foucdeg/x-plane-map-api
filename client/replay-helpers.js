import { REFRESH_FRAME_RATE } from './constants';

const makeVisiblePath = (fullPath, currentTimestamp) => {
  const visiblePath = fullPath.filter(({ timestamp }) => timestamp <= currentTimestamp);
  const lastVisiblePathPoint = visiblePath[visiblePath.length - 1];
  const nextUnreachedPathPoint = fullPath[visiblePath.length];

  const ratio = (currentTimestamp - lastVisiblePathPoint.timestamp)
    / (nextUnreachedPathPoint.timestamp - lastVisiblePathPoint.timestamp);

  const proRata = (prevValue, nextValue) => prevValue + ratio * (nextValue - prevValue);

  const virtualIntermediatePoint = {
    lat: proRata(lastVisiblePathPoint.lat, nextUnreachedPathPoint.lat),
    lng: proRata(lastVisiblePathPoint.lng, nextUnreachedPathPoint.lng),
    alt: proRata(lastVisiblePathPoint.alt, nextUnreachedPathPoint.alt),
    heading: proRata(lastVisiblePathPoint.heading, nextUnreachedPathPoint.heading),
  };
  visiblePath.push(virtualIntermediatePoint);

  return visiblePath;
};

export function refreshReplay(state) {
  if (state.replaySpeed === 0) return state;

  const newTimestamp = state.currentTimestamp
    + REFRESH_FRAME_RATE * state.replaySpeed;
  if (newTimestamp > state.maxTimestamp) {
    return state;
  }

  const newVisiblePath = makeVisiblePath(state.path, newTimestamp);
  const { lat, lng, heading } = newVisiblePath[newVisiblePath.length - 1];

  return {
    ...state,
    currentTimestamp: newTimestamp,
    visiblePath: newVisiblePath,
    position: [lat, lng],
    heading,
  };
}

export function resetPlaneToInitialPosition(plane) {
  const initialPosition = plane.path[0];
  const { timestamp, lat, lng, alt, heading } = initialPosition;

  return {
    ...plane,
    visiblePath: [initialPosition],
    currentTimestamp: timestamp,
    replaySpeed: 0,
    minTimestamp: timestamp,
    maxTimestamp: plane.path[plane.path.length - 1].timestamp,
    position: [lat, lng],
    altitude: alt,
    heading,
  };
}
