import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from 'redux/store';
import PublicRoutes from 'router';
import DashAppHolder from 'dashAppStyle';
import Boot from 'redux/boot';
const DashApp = () => (
  <DashAppHolder>
    <Provider store={store}>
      <PublicRoutes history={history} />
    </Provider>
  </DashAppHolder>
);
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error));

export default DashApp;
