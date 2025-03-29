"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { date: "Mar", price: 800 },
  { date: "Apr", price: 900 },
  { date: "May", price: 700 },
  { date: "Jun", price: 1000 },
  { date: "Jul", price: 1100 },
  { date: "Aug", price: 1000 },
  { date: "Sep", price: 1200 },
  { date: "Oct", price: 1300 },
  { date: "Nov", price: 1250 },
  { date: "Dec", price: 1150 },
  { date: "Jan", price: 1100 },
  { date: "Feb", price: 1200 },
];

export function StatsChart() {
  return (
    <div className="h-[350px] w-full text-zinc-50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Price</span>
                        <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold">{payload[0].payload.date}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#6366F1"
            fill="url(#priceGradient)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
