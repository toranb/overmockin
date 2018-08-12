import { createSelector } from 'reselect';

const informationState = (state) => state.information;

export const getConfiguration = createSelector(
  informationState,
  (informationState) => informationState.configuration
);
