import { Transfer } from '@arco-design/web-react';
import { useState } from 'react';
const SearchTransfer = (props:any)=> {
  let { data,onSelectedData } = props   //穿梭框数据源
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const handleChange = (nextTargetKeys: string[]) => {
    console.log('handleChange',nextTargetKeys);
    setTargetKeys(nextTargetKeys);
    // 根据 targetKeys 获取所选的数据
    const selectedData = data.filter((item:any) => nextTargetKeys.includes(item.key));
    //将所选的数据传递给父组件
    onSelectedData(selectedData);
  };
  
  return (
    <div style={{background:'#fff'}}>
      <Transfer
        showSearch
        dataSource={data}
        targetKeys={targetKeys}
        titleTexts={['请选择', '已选择']}
        onChange={handleChange}
      />
      
    </div>
  
  );
}

export default SearchTransfer;
