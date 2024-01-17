import { Box } from '@mui/material';
import {
  PieChart,
  ResponsiveChartContainer,
  pieArcLabelClasses,
} from '@mui/x-charts';

const CategoryWisePieChart = ({ transactionList }) => {
  // console.log(transactionList);

  const data = transactionList.reduce((accumulator, transaction) => {
    if (!accumulator.some((ele) => ele?.label === transaction?.category)) {
      accumulator.push({
        label: transaction.category,
        value: transaction.amount,
      });
    } else {
      accumulator.find((ele) => ele?.label === transaction?.category).value +=
        transaction?.amount;
    }
    return accumulator;
  }, []);

  let Total = 0;
  data.forEach((item) => {
    Total += item.value;
  });

  return (
    <>
      <PieChart
        series={[
          {
            arcLabel: (item) =>
              `${item.label} (${((item.value / Total) * 100).toFixed(0)}%)`,
            arcLabelMinAngle: 10,
            data: data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            paddingAngle: 1,
            cornerRadius: 5,
            innerRadius: 30,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        margin={{ bottom: 50 }}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 10,
            },
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'center' },
            padding: 0,
            itemMarkHeight: 6,
          },
        }}
        tooltip={{ trigger: 'item' }}
        width={400}
        height={400}
      />
    </>
  );
};
export default CategoryWisePieChart;
