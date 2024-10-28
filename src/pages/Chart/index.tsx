import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import DoughnutChart from "@/components/DoughnutChart";
import ScatterChart from "@/components/ScatterChart";
import RadarChart from "@/components/RadarChart";
import styles from "./style.module.less";

const Chart = () => {
  return (
    <div className={styles["wrapper"]}>
      <LineChart />
      <BarChart />
      <PieChart />
      <DoughnutChart />
      <ScatterChart />
      <RadarChart />
    </div>
  );
};

export default Chart;
