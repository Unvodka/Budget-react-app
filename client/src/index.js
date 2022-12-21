import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { disableReactDevtools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') (disableReactDevtools())

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
