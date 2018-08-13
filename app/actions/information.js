import fetch from 'fetch';

export const toggle = function(id) {
  return dispatch => {
    fetch(`/api/configuration/toggle/${id}`, {method: 'POST'})
      .then(fetched => fetched.json())
      .then(() => dispatch({type: 'TOGGLE_CONFIG', id}))
  };
}
