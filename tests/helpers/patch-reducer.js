import redux from 'redux';
import thunk from 'redux-thunk';
import createSaga from 'redux-saga';
import rootSaga from 'overmockin/sagas/index';
import reducers from 'overmockin/reducers/index';
import ReduxService from 'ember-redux/services/redux';
import Immutable from 'seamless-immutable';

const { createStore, applyMiddleware, compose } = redux;

export function patchReducer(context, initState) {
  const sagaMiddleware = createSaga();

  const makeStoreInstance = () => {
    const middlewares = applyMiddleware(thunk, sagaMiddleware);
    const createStoreWithMiddleware = compose(middlewares)(createStore);
    const store = createStoreWithMiddleware(reducers, Immutable.from(initState));
    sagaMiddleware.run(rootSaga);
    return store;
  };

  context.owner.register('service:redux', ReduxService.extend({ makeStoreInstance }));
}
