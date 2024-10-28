import { useState,useEffect } from "react";
import { DatePicker, Form,Input, InputNumber, Select ,Button} from '@arco-design/web-react';
import { Grid } from '@arco-design/web-react';
import SearchTransfer from "@/components/SearchTransfer";
import CustomUpload from "@/components/CustomUpload";
import PageForm from "@/components/PageForm"
import PageModal from "@/components/PageModal";
import { showAlert, showConfirm, showMessage } from "@/utils";

const Row = Grid.Row;
const Col = Grid.Col;
const FormItem = Form.Item;

const RoleEdit = () => {
  const [form] = Form.useForm()
   //类型opts
  const opts=[{
      label: 'one',
      value: 0,
    },
    {
      label: 'two',
      value: 1,
    },
    {
      label: 'three',
      value: 2,
    }
  ]

  /*************** 弹窗 *****************/
  const [showModal, setShowModal] = useState(false)
  //弹窗取消
  const onModalClose=()=>{
    setShowModal(false)
  }

  //弹窗确定
  const onModalOk=()=>{
    setShowModal(false)
  }

  /************** 提交表单 ****************/
  const [loading, setLoading] = useState(false);
  const submitForm=async () => {
    const myForm = form.getFieldsValue();
    console.log('单独提交数据',myForm);
    setLoading(true);
    setTimeout(()=>{
      //示例 演示
      showMessage('success','保存成功message')
      showAlert('success','保存成功alert')
      showConfirm('保存成功confirm').then(()=>{
        console.log('点击了确定')
      })
      setShowModal(true)

      form.resetFields()
      setLoading(false)
    },1000)
  }
    //穿梭框数据
  type Item = {
    key: string;
    value: string;
  };
  const [TransferData, setTransferData]= useState<Item[]>([])
  useEffect(() => {
    let data  = new Array(8).fill(null).map((_, index) => ({
      key: `${index + 1}`,
      value: `Option ${index + 1}`,
    }));
    console.log(TransferData);
    setTransferData(data)
  }, []);
  //获取穿梭框所选数据
  const selectedData = (data:any)=>{
    console.log(111,data);
  }

  return <>
    <PageForm loading={loading} onSubmit={submitForm}>
      <Form layout='vertical' form={form} autoComplete='off'>
        <Row gutter={50}>
          <Col span={8}>
            <FormItem label='金额' field='name' rules={[{ required: true }]}>
              <Input placeholder='请输入...'  addAfter={'元'}/>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='年龄' field='age' rules={[{ required: true, type: 'number', min: 1, max: 199 }]}>
              <InputNumber placeholder='请输入...' />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='类型' field='type' rules={[{ required: true }]}>
              <Select placeholder='请选择' options={opts} allowClear style={{ width: 180 }}/>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='创建日期' field='date' rules={[{ required: true, message: 'Please enter number' }]}
              normalize={(value) => {
                return {
                  begin: value && value[0],
                  end: value && value[1],
                };
              }}
              formatter={(value) => {
                return value && value.begin ? [value.begin, value.end] : [];
              }}
            >
              <DatePicker.RangePicker showTime />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="上传文件" field="file">
              <CustomUpload url="//upload-z2.qbox.me/" />
            </FormItem>
          </Col>
        </Row>
        <SearchTransfer data = { TransferData }  onSelectedData = { selectedData }/>
      </Form>
    </PageForm>

    {/* 弹窗 begin */}
    <PageModal showModal={showModal} setShowModal={setShowModal} title='弹窗'>
      <div slot="content">modal 内容区</div>
      <div slot="footer">
        <Button onClick={onModalClose}>取消</Button>
        <Button type='primary' onClick={onModalOk} style={{ marginLeft: 25 }}>确认</Button>
      </div>
    </PageModal>
    {/* 弹窗 end */}
  </>
};

export default RoleEdit;
