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
      <p>抱歉，页面不见了~</p>
      <Space size='large'>
        <Button type='primary'>返回</Button>
        <Button type='secondary'>重试</Button>
      </Space>
      </div>
    </div>
  );
};
export default Index;
