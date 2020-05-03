import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {  PieChart, Pie, Tooltip} from 'recharts'

const CustomPieChart = ({data, size, handleItemClick}) => {
  const theme = useTheme();
  return (
      <div class="pie-chart">
        <PieChart width={size.width} height={size.height} onClick={event=>handleItemClick(event)}>
          <Pie data={data} dataKey="total" nameKey="start" cx="50%" cy="50%" fill={theme.palette.primary.main} stroke="#fff" label />
          <Tooltip contentStyle={ {display:"none"}}/>
        </PieChart>
      </div>
  )

}

export default CustomPieChart;
