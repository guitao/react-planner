import React, {PropTypes} from 'react';
import PanelPropertiesEditor from './panel-properties-editor/panel-properties-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelLayerElements from './panel-layer-elements';

export default function Sidebar({width, height, state}) {
  return (
    <aside
      style={{backgroundColor: "#28292D", display:"block", overflow: "scroll", width, height}}
      onKeyDown={event => event.stopPropagation()}
      onKeyUp={event => event.stopPropagation()}
    >
      <PanelLayers state={state}/>
      <PanelLayerElements state={state}/>
      <PanelPropertiesEditor state={state}/>
      <PanelGuides state={state}/>
    </aside>
  );
}

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
