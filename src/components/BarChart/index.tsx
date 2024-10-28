import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ECharts } from "echarts";

const BarChart = () => {
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
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
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

export default BarChart;
