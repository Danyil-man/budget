import { FC } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { TRANSACTION_TYPE } from "../constants";

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

interface IChartData {
  value: number;
  name: string;
}
export const Chart: FC<IChart> = ({ totalExpense, totalIncome }) => {
  const COLORS = ["#16a34a", "#ef4444"];

  const data = new Array<IChartData>(
    {
      value: totalIncome,
      name: TRANSACTION_TYPE.INCOME,
    },
    {
      value: totalExpense,
      name: TRANSACTION_TYPE.EXPENSE,
    }
  );

  return (
    <PieChart width={280} height={220}>
      <Pie
        data={data}
        cx={"50%"}
        cy={"50%"}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};
