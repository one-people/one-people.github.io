import { useEffect } from "react";
import { useImmer } from "use-immer";
import PageSearch from "../PageSearch";
import PageTable from "../PageTable";
import { get } from "@/api/http";
// import styles from "./style.module.less";

const PageList = ({ config, children }: any) => {
  const {
    items,
    initialValues,
    onSearch,
    rowKey,
    columns,
    rowSelection,
    pageNum = 1,
    pageSize = 20,
    pagination = true,
  } = config;

  const [state, setState] = useImmer({
    searchParams: {
      ...initialValues,
    },
    data: [],
    total: 0,
    pageNum,
    pageSize,
    loading: false,
  });

  useEffect(() => {
    loadData();
  }, [state.searchParams, state.pageNum, state.pageSize]);

  const loadData = () => {
    let params = {
      ...state.searchParams,
    };

    if (pagination) {
      params.pageNum = state.pageNum;
      params.pageSize = state.pageSize;
    }

    get(config.url, params)
      .then((res) => {
        const data = res.results;

        setState((slot) => {
          slot.loading = false;
          slot.data = data;
          slot.total = data.length;
        });
      })
      .catch((err) => {
        console.log("🚀 ~ loadData ~ err:", err);
        setState((slot) => {
          slot.loading = false;
        });
      });
  };

  //查询，重置筛选项操作
  const handleSearch = (value: any) => {
    setState((slot) => {
      slot.searchParams = value;
    });
    onSearch?.(value);
  };

  const handleChange = (value: any) => {
    const { current, pageSize } = value;

    setState((slot) => {
      slot.pageNum = current;
      slot.pageSize = pageSize;
    });
  };

  return (
    <>
      <PageSearch
        items={items}
        initialValues={initialValues}
        onSearch={handleSearch}
        style={{ marginBottom: 10 }}
      />
      <PageTable
        rowKey={rowKey}
        columns={columns}
        rowSelection={rowSelection}
        data={state.data}
        loading={state.loading}
        onChange={handleChange}
        pagination={
          pagination && {
            total: state.total,
            current: state.pageNum,
            pageSize: state.pageSize,
          }
        }
      >
        {children}
      </PageTable>
    </>
  );
};

export default PageList;
