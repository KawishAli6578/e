import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

import rootReducer from './reducers';

const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware)));

export default store;
