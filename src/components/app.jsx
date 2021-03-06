"use strict";

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDimensions from 'react-dimensions';

import actions from '../actions/actions';

import Layout from './layout';


class App extends React.Component {

  getChildContext() {
    let ctx = {
      catalog: this.props.catalog,
      customActions: this.props.customActions,
    };

    for (let actionGroupName in actions) {
      ctx[actionGroupName] = this.props[actionGroupName];
    }

    return ctx;
  }

  componentDidMount() {
    window.ReactPlanner = {
      store: this.props.store,
      getState: () => this.props.store.getState().toJS(),
      ...actions,
      customActions: this.props.customActions,
      do: (actions, delay = 300) => {
        actions = actions.reverse();
        let dispatch = this.props.store.dispatch;
        let dispatchAction = () => {
          console.info(`There are other ${actions.length} actions on stack`);
          if (actions.length === 0) return;
          dispatch(actions.pop());
          if (actions.length === 0) return;
          setTimeout(dispatchAction, delay);
        };
        setTimeout(dispatchAction, 0);
      }
    };
    console.groupCollapsed("ReactPlanner");
    console.info("ReactPlanner is ready");
    console.info("console.log(ReactPlanner)");
    console.log(window.ReactPlanner);
    console.groupEnd();
  }

  render() {
    let {containerWidth, containerHeight, ...props} = this.props;
    return <Layout width={containerWidth} height={containerHeight} {...props} />;
  }
}


App.childContextTypes = {
  catalog: PropTypes.object,
  customActions: PropTypes.object,
};
for (let actionName in actions) {
  App.childContextTypes[actionName] = PropTypes.object
}


function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  let dispatchableActions = {};
  for (let actionGroupName in actions) {
    dispatchableActions[actionGroupName] = bindActionCreators(actions[actionGroupName], dispatch);
  }
  return dispatchableActions;
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
App = ReactDimensions()(App);
export default App;
