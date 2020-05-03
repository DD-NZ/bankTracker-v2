import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {  BarChart, XAxis, YAxis,Bar, CartesianGrid, Tooltip } from 'recharts'


const CustomBarChart = ({data, size, handleItemClick}) => {
  const theme = useTheme();

  return (
      <div class="bar-chart">
        <BarChart width={size.width} height={size.height} data={data} onClick={event=>handleItemClick(event)}>
          <XAxis dataKey='start' stroke="#fff" fill="#fff" />
          <YAxis stroke="#fff" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={ {display:"none"}}/>
          <Bar dataKey='total' type="monotone" fill={theme.palette.primary.main} />
        </BarChart>
      </div>
  )
}

export default CustomBarChart;
