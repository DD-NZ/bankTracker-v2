import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {  LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip } from 'recharts'

const CusomtLineGraph = ({data, size, clickedItem, handleItemClick}) => {
  const theme = useTheme();
  return (
    <div class="line-graph">
      <LineChart width={size.width} height={size.height} data={data} onClick={event=>handleItemClick(event)}>
        <XAxis dataKey='start' stroke="#fff" fill="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={ {display:"none"}}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Line dataKey='total' type="monotone" stroke={theme.palette.primary.main} />
      </LineChart>
    </div>
  )

}

export default CusomtLineGraph;
