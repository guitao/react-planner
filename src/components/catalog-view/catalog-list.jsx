import React, {PropTypes} from 'react';
import CatalogItem from './catalog-item';
import {Seq} from 'immutable'

const STYLE_TITLE ={
  color: "#2e2f33",
};

const STYLE_CONTAINER = {
  padding: "0 20px",
  overflowY: "scroll"
};

const STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap",
};


export default function CatalogList({width, height, state}, {catalog}) {
  return (
    <div style={{width, height, ...STYLE_CONTAINER}} onWheel={event => event.stopPropagation()}>
      <h2 style={STYLE_TITLE}>Catalog</h2>
      <div style={STYLE_ITEMS}>
        {Seq(catalog.elements)
          .entrySeq()
          .filter(([name, element]) => element.prototype !== 'areas')
          .map(([name, element]) => <CatalogItem key={name} element={element}/>)}
      </div>
    </div>
  )
}

CatalogList.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
};
