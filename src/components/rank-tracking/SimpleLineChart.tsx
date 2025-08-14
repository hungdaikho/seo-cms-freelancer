"use client";
import React from "react";

interface SimpleLineChartProps {
  data: { date: string; position: number }[];
  height?: number;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  height = 200,
}) => {
  if (!data || data.length === 0) return null;

  const maxPosition = Math.max(...data.map((d) => d.position));
  const minPosition = Math.min(...data.map((d) => d.position));
  const range = maxPosition - minPosition || 1;

  const width = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth + margin.left;
    const y = ((maxPosition - d.position) / range) * chartHeight + margin.top;
    return { x, y, position: d.position, date: d.date };
  });

  const pathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = margin.top + (percent / 100) * chartHeight;
          return (
            <line
              key={percent}
              x1={margin.left}
              y1={y}
              x2={width - margin.right}
              y2={y}
              stroke="#f0f0f0"
              strokeDasharray="4,4"
            />
          );
        })}

        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = margin.top + (percent / 100) * chartHeight;
          const value = maxPosition - (percent / 100) * range;
          return (
            <text
              key={percent}
              x={margin.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="12"
              fill="#666"
            >
              {value.toFixed(1)}
            </text>
          );
        })}

        {/* Line */}
        <path d={pathData} fill="none" stroke="#1890ff" strokeWidth="2" />

        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#1890ff"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}

        {/* X-axis labels */}
        {points.map((point, i) => {
          if (i % Math.ceil(points.length / 4) === 0) {
            const date = new Date(point.date);
            return (
              <text
                key={i}
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {`${date.getMonth() + 1}/${date.getDate()}`}
              </text>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default SimpleLineChart;
