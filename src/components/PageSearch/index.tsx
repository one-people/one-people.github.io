import {
  Form,
  Input,
  Select,
  Cascader,
  DatePicker,
  Space,
  Button,
} from "@arco-design/web-react";
import { IconSearch, IconRefresh } from "@arco-design/web-react/icon";
import RemoteSearch from "@/components/RemoteSearch";
import styles from "./style.module.less";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const PageSearch = ({ items, initialValues, onSearch, style }: any) => {
  const [form] = Form.useForm();

  const handleSubmit = async (query: any) => {
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => {
        if (typeof value === "string") {
          return value.trim() !== ""; // 过滤非空字符串
        } else if (Array.isArray(value)) {
          return value.length > 0; // 过滤非空数组
        } else {
          return value !== null && value !== undefined; // 过滤非空值
        }
      })
    );
    onSearch(filteredQuery);
  };

  const handleReset = () => {
    form.resetFields();
    onSearch();
  };

  const renderFormItem = (item: any) => {
    let component = null;

    switch (item.type) {
      case "Input":
        component = (
          <Input
            allowClear={item.allowClear}
            placeholder={item.placeholder || "请输入"}
            style={{ width: 200, ...item.style }}
          />
        );
        break;
      case "Select":
        component = (
          <Select
            allowClear={item.allowClear}
            mode={item.multiple && "multiple"}
            placeholder={item.placeholder || "请选择"}
            style={{ width: 200, ...item.style }} 
          >
            {(item.options || []).map((option: any) => (
              <Select.Option
                key={option[item.fieldNames?.value] || option.value}
                value={option[item.fieldNames?.value] || option.value}
              >
                {option[item.fieldNames?.label] || option.label}
              </Select.Option>
            ))}
          </Select>
        );
        break;
      case "RemoteSearch":
        component = <RemoteSearch config={item} />;
        break;
      case "Cascader":
        component = (
          <Cascader
            allowClear={item.allowClear}
            mode={item.multiple && "multiple"}
            placeholder={item.placeholder || "请选择"}
            options={item.options}
            fieldNames={item.fieldNames}
            style={{ width: 200, ...item.style }}
          />
        );
        break;
      case "Date":
        component = (
          <DatePicker
            allowClear={item.allowClear}
            showTime={item.showTime}
            placeholder={item.placeholder}
            style={{ width: 200, ...item.style }}
          />
        );
        break;
      case "DateRange":
        component = (
          <RangePicker
            allowClear={item.allowClear}
            showTime={item.showTime}
            placeholder={item.placeholder}
            style={{ width: 380, ...item.style }}
          />
        );
        break;
    }

    return (
      <FormItem key={item.field} label={item.label} field={item.field} >
        {component}
      </FormItem>
    );
  };

  return (
    <div className={styles["wrapper"]} style={style}>
      <Form
        layout="inline"
        autoComplete="off"
        form={form}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {items.map((item: any) => {
          return renderFormItem(item);
        })}
        <FormItem>
          <Space size={10}>
            <Button type="primary" htmlType="submit" icon={<IconSearch />}>
              查询
            </Button>
            <Button icon={<IconRefresh />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </FormItem>
      </Form>
    </div>
  );
};

export default PageSearch;
