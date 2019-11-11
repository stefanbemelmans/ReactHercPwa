import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './Features/Application/components/App';
import rootReducer from './Features/Application/reducers';
import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
