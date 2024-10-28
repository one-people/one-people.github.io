import { Image, Button, Space } from '@arco-design/web-react';
import styles from "./style.module.less";

const Index = () => {
  return (
    <div className={styles["result"]}>
      <div className={styles["result1"]}>
        <Image className={styles["iconTip"]}
          src='https://cdn.nucarf.net/wxapp_wjy/v1.0/images/order/success.png'
          alt='lamp'
        /> 
        <div className={styles["tip"]}>提交成功</div>
        <Space size='large'>
          <Button type='primary'>返回</Button>
        </Space>
      </div>
    </div>
  );
};
export default Index;
