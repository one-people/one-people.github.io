import { Button, Space } from "@arco-design/web-react";
import PageList from "@/components/PageList";
// import styles from "./style.module.less";

const RoleList = () => {
  const items = [
    {
      type: "Input",
      field: "input",
      label: "输入框",
      placeholder: "",
      allowClear: true,
    },
    {
      type: "Select",
      field: "select",
      label: "选择框",
      placeholder: "",
      allowClear: true,
      multiple: true,
      options: [
        {
          label: "选择1",
          value: "1",
        },
        {
          label: "选择2",
          value: "2",
        },
        {
          label: "选择3",
          value: "3",
        },
      ]
    },
    {
      type: "RemoteSearch",
      field: "remoteSearch",
      label: "远程搜索",
      placeholder: "",
      allowClear: true,
      url: "https://randomuser.me/api/?results=5",
      optionsFormatter: (options: any) => {
        return options.map((user: any) => ({
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              {`${user.name.first} ${user.name.last}`}
            </div>
          ),
          value: user.email,
        }));
      },
    },
    {
      type: "Cascader",
      field: "cascader",
      label: "级联选择",
      placeholder: "",
      allowClear: true,
      multiple: true,
      options: [
        {
          label: "级联选择1",
          value: "1",
          children: [
            {
              label: "级联选择1-1",
              value: "1-1",
            },
          ],
        },
        {
          label: "级联选择2",
          value: "2",
          children: [
            {
              label: "级联选择2-1",
              value: "2-1",
            },
            {
              label: "级联选择2-2",
              value: "2-2",
              children: [
                {
                  label: "级联选择2-2-1",
                  value: "2-2-1",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "Date",
      field: "date",
      label: "日期选择器",
      placeholder: "",
    },
    {
      type: "DateRange",
      field: "dateRange",
      label: "日期区间选择器",
      placeholder: "",
    },
  ];

  const handleSearch = (value: any) => {
    console.log("🚀 ~ handleSearch ~ value:", value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: object, record: any) => {
        return record.name.first + record.name.last;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      align: "center",
      render: (_: object, record: any) => (
        <Space>
          <Button
            onClick={() => removeRow(record.key)}
            type="text"
            size="mini"
            status="danger"
          >
            Delete
          </Button>
          <Button onClick={() => {}} type="text" size="mini">
            edit
          </Button>
        </Space>
      ),
    },
  ];

  const removeRow = (key: any) => {
    console.log("🚀 ~ removeRow ~ key:", key);
  };

  const config = {
    items,
    initialValues: {//设置筛选项初始值
      select:['3']
    },
    onSearch: handleSearch,
    rowKey: "email",
    columns,
    url: "https://randomuser.me/api/?results=40",
  };

  return (
    <PageList config={config}>
      <div slot="header">头部预留区</div>
      <div slot="footer">尾部预留区</div>
    </PageList>
  );
};

export default RoleList;
