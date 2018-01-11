import _ from 'lodash';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  all: undefined,
  selectedItem: undefined,
  configuration: undefined
});

export default function information(state, action) {
  switch (action.type) {
    case 'FETCH_INFO': {
      const information = _.keyBy(action.payload.information, info => info.id);
      return {
        ...state,
        all: information
      }
    }
    case 'FETCH_CONFIG': {
      const config = _.keyBy(action.payload.configurations, option => option.id);
      return {
        ...state,
        configuration: config,
        selectedItem: action.selectedId
      }
    }
    case 'TOGGLE_CONFIG': {
      const config = _.mapValues(state.configuration, config => {
        if (config.id === action.id) {
          return _.defaults({
            active: !config.active
          }, config);
        }
        return config;
      });
      return {
        ...state,
        configuration: config
      }
    }
    default: {
      return state || initialState;
    }
  }
}

const all = state => state.information.all;
const selectedItem = state => state.information.selectedItem;
const configuration = state => state.information.configuration;

const activeItem = createSelector(
  all,
  selectedItem,
  configuration,
  (all, selectedItem, configuration) => {
    const items = all || {};
    const config = configuration || {};
    const activeColumns = Object.values(config).reduce((prev, current) => {
      return current.active ? prev.concat(current.column) : prev;
    }, []);
    return _.pick(items[selectedItem], activeColumns);
  }
);

export { all, activeItem };
