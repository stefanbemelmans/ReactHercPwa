import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import store from './store'
import * as serviceWorker from './serviceWorker'
console.log(store, "store")

render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
