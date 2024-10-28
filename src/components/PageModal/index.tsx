
/***
 * 示例
    <PageModal showModal={showModal} setShowModal={setShowModal} title='弹窗标题'>
      <div slot="content">内容区</div>
      <div slot="footer">
        <Button onClick={onModalClose}>取消</Button>
        <Button type='primary' onClick={onModalOk}>确认</Button>
      </div>
    </PageModal>
 * 说明：
    1、标题可不传，不传显示“提示”
    2、弹窗内容统一在content插槽
    3、若无按钮区域，可直接删除底部按钮插槽
 * 
****/
import { Modal } from "@arco-design/web-react"
import { useMemo } from "react";

const PageModal= (props: any) => {

  const { showModal,setShowModal,title,children } = props

  //内容区
  const renderContent = useMemo(() => {
    let el=[]
    if(Array.isArray(children)){
      el = children?.filter((item: any) => item.props.slot === "content");
    }else{
      el.push(children)
    }
    return el;
  }, [children]);

  //底部按钮
  const renderFooter = useMemo(() => {
    try{
      const el = children?.filter((item: any) => item.props.slot === "footer");
      return el;
    }catch{
      return null
    }
  }, [children]);

  //点击取消,右上角关闭按钮
  const handleCancel=()=>{
    setShowModal(false)
  }

  return <>
    <Modal title={<div style={{ textAlign: 'left' }}>{title?title:'提示'}</div>} visible={showModal} 
      autoFocus={false}
      focusLock={true} 
      onCancel={handleCancel} 
      footer={renderFooter}
    >
      {renderContent}
    </Modal>
  </>
}

export default PageModal