import { fork } from 'redux-saga/effects';
import { fetchInfo, fetchConfig, toggleConfig } from './information';

export default function* root() {
  yield [
    fork(fetchInfo),
    fork(fetchConfig),
    fork(toggleConfig)
  ];
}
