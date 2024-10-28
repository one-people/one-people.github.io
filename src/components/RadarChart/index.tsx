import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

const RadarChart = () => {
  const chartRef = useRef(null);
  let myChart: ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      myChart.setOption({
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      });
    }

    return () => {
      // 组件卸载时销毁echarts实例
      myChart && myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "600px", height: "400px" }}></div>;
};

export default RadarChart;
