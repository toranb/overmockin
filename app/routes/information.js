import { route } from 'ember-redux';

const model = dispatch => {
  dispatch({type: 'FETCH_INFO_ASYNC'});
}

export default route({model})();
