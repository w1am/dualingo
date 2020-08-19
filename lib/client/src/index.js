import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import Favicon from 'react-favicon';
import 'leaflet/dist/leaflet.css';
import './index.css';

import App from './App';

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Favicon url="https://raw.githubusercontent.com/w1am/mygoods.mu/master/lib/client/src/assets/Group%20117.ico?token=AH6PARQCZ6TQSFFWMX2ISHK7IVT7G"/>
    </div>
    <App />
  </Provider>
  ,document.getElementById('app'));

module.hot.accept();
