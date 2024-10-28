import { useMemo } from "react";
import { useImmer } from "use-immer";
import { Table } from "@arco-design/web-react";
import styles from "./style.module.less";

const PageTable = ({
  rowKey,
  columns,
  data,
  pagination,
  loading,
  rowSelection,
  onChange,
  children,
}: any) => {
  const [state, setState] = useImmer({
    selectedRowKeys: [],
    selectedRows: [],
    pagination: {
      sizeCanChange: true,
      showTotal: true,
      total: undefined,
      pageSize: 10,
      current: 1,
      pageSizeChangeResetCurrent: true,
    },
  });

  const renderRowSelection = useMemo(() => {
    return (
      rowSelection && {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          setState((slot) => {
            slot.selectedRowKeys = selectedRowKeys;
            slot.selectedRows = selectedRows;
          });
        },
        ...rowSelection,
      }
    );
  }, [rowSelection]);

  const getSlotElement = (keyword: string) => {
    let el = null;

    if (Array.isArray(children)) {
      el = children?.filter((item: any) => item.props.slot === keyword);
    } else {
      if (children?.props.slot === keyword) {
        el = children;
      }
    }

    return el;
  };

  const renderHeader = useMemo(() => {
    let el = getSlotElement("header");
    return el ? <div className={styles["header-wrap"]}>{el}</div> : null;
  }, [children]);

  const renderFooter = useMemo(() => {
    let el = getSlotElement("footer");
    return el;
  }, [children]);

  return (
    <div className={styles["wrapper"]}>
      {renderHeader}
      <Table
        border={false}
        columns={columns}
        data={data}
        loading={loading}
        rowSelection={renderRowSelection}
        onChange={onChange}
        rowKey={(record: any) => record[rowKey]}
        pagination={pagination && { ...state.pagination, ...pagination }}
        renderPagination={(paginationNode) => (
          <div className={styles["pagination-wrap"]}>
            <div>{renderFooter}</div>
            {paginationNode}
          </div>
        )}
      />
    </div>
  );
};

export default PageTable;
