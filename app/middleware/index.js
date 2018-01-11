import createSagaMiddleWare from 'redux-saga';
import thunk from 'redux-thunk';
import root from '../sagas/index';

const sagaMiddleware = createSagaMiddleWare();

const setup = () => {
  sagaMiddleware.run(root);
};

export default {
  middleware: [sagaMiddleware, thunk],
  setup: setup
};
