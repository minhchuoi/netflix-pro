import React from 'react';
import { BrowseContainer } from '../containers/browse';
import { useContent } from '../hooks';
import { selectionFilter } from '../utils';
import { store } from './store';
import { Provider } from 'react-redux'

export default function Browse() {
  const { series } = useContent('series');
  const { films } = useContent('films');
  const slides = selectionFilter({ series, films });
  // console.log(series);

  return (
    <Provider store={store}>
      <BrowseContainer slides={slides} seriess={series} filmss={films} />
    </Provider>);
}