import {browserUpload, browserDownload}  from '../utils/browser';
import {
  NEW_PROJECT,
  LOAD_PROJECT,
  SAVE_PROJECT,
  LOAD_PROJECT_FROM_FILE,
  SAVE_PROJECT_TO_FILE,
  OPEN_CATALOG,
  SELECT_TOOL_EDIT,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK
} from '../constants';

export function loadProject(data) {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: LOAD_PROJECT,
      data, catalog
    });
  }
}

export function newProject() {
  return {
    type: NEW_PROJECT
  }
}

export function saveProject() {
  return {
    type: SAVE_PROJECT
  }
}

export function loadProjectFromFile() {
  return function (dispatch, getState) {

    dispatch({type: LOAD_PROJECT_FROM_FILE});

    var upload = browserUpload();
    upload.then((data) => {
      dispatch(loadProject(JSON.parse(data)));
    });
  };
}

export function saveProjectToFile() {
  return function (dispatch, getState) {

    dispatch({type: SAVE_PROJECT_TO_FILE});

    var state = getState();
    let scene = state.get('scene').toJS();

    browserDownload(scene);
    dispatch(saveProject());
  };
}

export function openCatalog() {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: OPEN_CATALOG,
      catalog
    });
  }
}

export function selectToolEdit() {
  return {
    type: SELECT_TOOL_EDIT
  }
}

export function unselectAll() {
  return {
    type: UNSELECT_ALL
  }
}


export function setProperties(properties) {
  return {
    type: SET_PROPERTIES,
    properties
  }
}

export function remove() {
  return (dispatch, getState, {catalog}) => {
    dispatch({
      type: REMOVE,
      catalog
    })
  }
}

export function undo() {
  return {
    type: UNDO
  }
}

export function rollback() {
  return {
    type: ROLLBACK
  }
}
