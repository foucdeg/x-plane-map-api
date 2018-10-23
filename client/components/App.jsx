/* global window, Event */
/* eslint no-underscore-dangle: ["error", { "allow": ["_map"] }] */

import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import PlanesMap from '../containers/PlanesMap';
import PlanesPanel from '../containers/PlanesPanel';
import PlaneReplayControls from '../containers/PlaneReplayControls';
import '../stylesheets/map.less';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isPanelOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown');
  }

  handleMapLoad = (map) => {
    if (!map) return;
    this._map = map.getWrappedInstance();
  }

  togglePanel = () => {
    this.setState(({ isPanelOpen }) => ({ isPanelOpen: !isPanelOpen }));
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  handleKeys = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      this.togglePanel();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="map-canvas-wrapper" className={this.state.isPanelOpen ? 'shrinked' : ''}>
          <PlanesMap
            ref={this.handleMapLoad}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
          <PlaneReplayControls />
          <div className="buttons">
            <Tooltip title={this.state.isPanelOpen ? 'Hide panel' : 'Show panel'}>
              <Button size="small" variant="raised" color="primary" onClick={this.togglePanel}>
                <MenuIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
        <Drawer variant="persistent" anchor="right" open={this.state.isPanelOpen}>
          <PlanesPanel />
        </Drawer>
      </React.Fragment>
    );
  }
}
