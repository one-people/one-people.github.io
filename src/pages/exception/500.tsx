import { Image, Button, Space } from '@arco-design/web-react';
import styles from "./style.module.less";

const Index = () => {
  return (
    <div className={styles["exception"]}>
      <div className={styles["exception1"]}>
      <Image className={styles["iconTip"]}
        src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
        alt='lamp'
      /> 
      <p>抱歉，服务器出了点问题~</p>
      <Space size='large'>
        <Button type='primary'>返回</Button>
      </Space>
      </div>
    </div>
  );
};
export default Index;
