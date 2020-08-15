import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import 'leaflet/dist/leaflet.css';
import './index.css';

import App from './App';

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

module.hot.accept();
