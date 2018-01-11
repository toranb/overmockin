import fetch from 'fetch';

export function toggle(id) {
  return dispatch => {
    fetch(`/api/configuration/toggle/${id}`, {method: 'POST'})
      .then(fetched => fetched.json())
      .then(() => dispatch({type: 'TOGGLE_CONFIG', id}))
  };
}
