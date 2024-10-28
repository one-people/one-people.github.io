import { Button } from "@arco-design/web-react";
import styles from "./style.module.less";

/**
 * hideFooter 隐藏底部按钮区
 * 不设置此参数，展示
 * 设置为true，隐藏
 * 示例：
 * <PageForm hideFooter={true}>
      表单区域
    </PageForm>
 * **/
const PageForm = ({loading,onSubmit,hideFooter,children}: any) => {

//获取form
let form=children.props.form

//点击提交
const handleSubmit=async ()=>{
  try {
    await form.validate();
    onSubmit()
  } catch (e) {}
}

//点击重置
const handleReset=()=>{
  children.props.form.resetFields();
}

//隐藏底部按钮区域
const onHideFooter=()=>{
  if(!hideFooter){
    return <>
      <div className={styles["footer-box"]}>
        <Button onClick={handleReset}>重置</Button>
        <Button type='primary' style={{ marginLeft: 25 }} loading={loading} onClick={handleSubmit}>提交</Button>
      </div>
    </>
  }
}

  return <>
    <div className={styles["container"]}>
      <div className={hideFooter?styles["main"]:styles["main-footer"]} >
        <div className={styles["wrapper"]}>
          {children}
        </div>
      </div>
      {onHideFooter()}
    </div>
  </>
};

export default PageForm;
