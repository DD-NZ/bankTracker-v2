import React, {useState} from 'react';
import CustomBarChart from './graphs/barChart'
import CustomLineGraph from './graphs/lineGraph'
import CustomPieChart from './graphs/pieChart'
import OverlayItem from './overlayItem/overlayItem'

const GraphData = ({data, graph, size}) => {
  const [clickedItem, setClickedItem] = useState(undefined);

  const handleItemClick = event => {
    const data = event.activePayload[0].payload;
    setClickedItem({
        start: data.start,
        end: data.end,
        total: data.total,
        transactions: data.transactions
    })
  }

  let chart;
  switch(graph){
    case "bar-chart":
      chart = <CustomBarChart data={data} size={size} clickedItem={clickedItem} handleItemClick={handleItemClick}/>;
      break;
    case "line-graph":
      chart = <CustomLineGraph data={data} size={size} clickedItem={clickedItem} handleItemClick={handleItemClick}/>
      break;
    case "pie-chart":
      chart = <CustomPieChart data={data} size={size} clickedItem={clickedItem} handleItemClick={handleItemClick}/>
      break;
    default:
      chart = undefined;
      break
  }
  return (
    <div class="graph-data" style={{height:size.height}}>
      {
        chart
      }
      { clickedItem ? <OverlayItem item={clickedItem} setClickedItem={setClickedItem} size={size} /> : null }
    </div>
  )

}

export default GraphData;
