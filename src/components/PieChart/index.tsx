import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

const PieChart = () => {
  const chartRef = useRef(null);
  let myChart: ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      console.log('创建饼图', chartRef);
      myChart = echarts.init(chartRef.current);
      myChart.setOption({
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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

export default PieChart;
