import fetch from 'fetch';
import { run } from '@ember/runloop';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchInfoAsync() {
  const fetched = yield call(fetch, '/api/information');
  const payload = yield call(f => run(() => f.json()), fetched);
  yield put({type: 'FETCH_INFO', payload});
}

export function* fetchInfo() {
  yield takeLatest('FETCH_INFO_ASYNC', fetchInfoAsync);
}

function* fetchConfigAsync(action) {
  const { selectedId } = action;
  const fetched = yield call(fetch, '/api/configuration');
  const payload = yield call(f => run(() => f.json()), fetched);
  yield put({type: 'FETCH_CONFIG', payload, selectedId});
}

export function* fetchConfig() {
  yield takeLatest('FETCH_CONFIG_ASYNC', fetchConfigAsync);
}

function* toggleConfigAsync(action) {
  const { id } = action;
  const fetched = yield call(fetch, `/api/configuration/toggle/${id}`, {method: 'POST'});
  yield call(f => run(() => f.json()), fetched);
  yield put({type: 'TOGGLE_CONFIG', id});
}

export function* toggleConfig() {
  yield takeLatest('TOGGLE_CONFIG_ASYNC', toggleConfigAsync);
}
