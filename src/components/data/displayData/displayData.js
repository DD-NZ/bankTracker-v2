import React from 'react';
import ListData from './listData/listData.js'
import GraphData from './graphData/graphData.js'
import filterData from './util/filterData'

const DisplayData = ({mode, data, filters, size}) => {
  const filteredData = filterData(mode, data, filters);
  return (
    <div class="display-data" >
      {
        mode === "display-list"
        ? <ListData data={filteredData} filters={filters} />
        : <GraphData data={filteredData} graph={filters.graph} size={size}/>
      }
    </div>
  )
};


export default DisplayData;
