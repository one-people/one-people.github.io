import { useEffect } from "react";
import { Button } from "@arco-design/web-react";
import { getData } from "@/api/modules/index";
import styles from "./style.module.less";

const Index = () => {
  const formData = new FormData();
  formData.append('query', 'modules');
  
  useEffect(() => {
    getData(formData).then((res) => {
      console.log("🚀 ~ useEffect ~ res:", res);
    });
  }, []);

  return (
    <div>
      {/* <div className={`${styles["wrapper"]} ${styles["wrapper1"]}`}> */}
      <div className={[styles["wrapper"], styles["wrapper1"]].join(" ")}>
        <Button type="primary">首页</Button>
      </div>
    </div>
  );
};
export default Index;
