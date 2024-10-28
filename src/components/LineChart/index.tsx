import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

const LineChart = () => {
  const chartRef = useRef(null);
  let myChart: ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      myChart.setOption({
        title: {
          text: "示例图表",
        },
        tooltip: {},
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {},
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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

export default LineChart;
