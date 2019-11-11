import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './Features/Application/components/App';

import configureStore from './configureStore'
import * as serviceWorker from './serviceWorker';


const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
