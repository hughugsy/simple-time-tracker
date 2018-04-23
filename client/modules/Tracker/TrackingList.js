import React from 'react';
import Tracking from './Tracking';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch/dom';


const TrackingList = () => (
  <InstantSearch
    appId="H9TCHGEKHR"
    apiKey="12ee730afb8ece7ae037ed814e11ad92"
    indexName="trackings"
  >
    <div className="container" >
      <SearchBox translations={{ placeholder: 'Search for trackings' }} />
      <div style={{ marginTop: '20px' }}>
        <Hits hitComponent={Tracking} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Pagination />
      </div>
    </div>
  </InstantSearch>
);

export default TrackingList;
