import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';


const IncomeExpenseChart = ({ chartData }) => {
  const theme = useTheme();
  let data = chartData.sort((a, b) => Number(a.name) - Number(b.name));

  return (
    <React.Fragment>
      <Title>Income vs Expense</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              I vs E
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="income"
            stroke={theme.palette.primary.main}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="expense"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
export default IncomeExpenseChart;
