import React from "react";
import { AdminContainer } from "../containers/admin";
import { store } from './store';
import { Provider } from 'react-redux'
// import { useContent } from '../hooks';
// import { selectionFilter } from '../utils';

export default function Admin() {
  return (
  <Provider store = {store}>
    <AdminContainer />
  </Provider>)
}