import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

const DoughnutChart = () => {
  const chartRef = useRef(null);
  let myChart: ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
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

export default DoughnutChart;
