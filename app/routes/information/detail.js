import { route } from 'ember-redux';

const model = (dispatch, params) => {
  const { selectedId } = params;
  dispatch({type: 'FETCH_CONFIG_ASYNC', selectedId});
  return selectedId;
}

export default route({model})();
