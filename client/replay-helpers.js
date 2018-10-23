import { getRhumbLineBearing } from 'geolib';

const toLatitudeLongitude = ({ lat, lng }) => ({
  latitude: lat,
  longitude: lng,
});

const getHeading = (from, to) => {
  if (!from) return 0;
  if (from.lng === to.lng && from.lat === to.lat) {
    return 0;
  }
  return getRhumbLineBearing(toLatitudeLongitude(from), toLatitudeLongitude(to));
};

export function resetPlaneToInitialPosition(plane) {
  return {
    ...plane,
    position: [plane.path[0].lat, plane.path[0].lng],
    altitude: plane.path[0].alt,
    heading: getHeading(plane.path[0], plane.path[1]),
  };
}

export function generateReplayControls(plane) {
  return {
    minTimestamp: plane.path[0].timestamp,
    maxTimestamp: plane.path[plane.path.length - 1].timestamp,
    speed: 0,
    areControlsVisible: true,
  };
}
