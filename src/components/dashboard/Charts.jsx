import React from "react";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 3 },
  { name: "Feb", value: 3.5 },
  { name: "Marc", value: 4},
  { name: "April", value: 6 },
  { name: "May", value: 7 },
  { name: "Jun", value: 8 },
  { name: "July", value: 7.5 },
  { name: "Agust", value: 6.5 },
  { name: "Sept", value: 8.5 },
  { name: "Oct", value: 9 },
  { name: "Now", value: 8.5},
  { name: "Dec", value: 8.5 },
];

const Charts = () => {
  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[3, 9]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      {chart("preserveEnd")}
      {/* {chart('preserveStart')}
      {chart('preserveStartEnd')}
      {chart('equidistantPreserveStart')}
      {chart(1)} */}
    </>
  );
};

export default Charts;
