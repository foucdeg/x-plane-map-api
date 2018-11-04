/* eslint no-underscore-dangle: "off" */
import { MapLayer, withLeaflet } from 'react-leaflet';
import { Marker as LeafletMarker } from 'leaflet';
import { PERIOD } from '../constants';

require('leaflet-rotatedmarker');

class RotatingMarker extends MapLayer {
  createLeafletElement(props) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }

    if (this.leafletElement._icon) {
      this.leafletElement._icon.style.transition = `all ${PERIOD - 10}ms linear`;
    }
  }
}

export default withLeaflet(RotatingMarker);
