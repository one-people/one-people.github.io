import { useRef, useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import { Select, Spin, Empty } from "@arco-design/web-react";
import { debounce } from "lodash";
import { get } from "@/api/http";

const RemoteSearch = ({ value, onChange, config }: any) => {
  const refFetchId: any = useRef(null);

  const [state, setState] = useImmer({
    fetching: false,
    options: [],
  });

  const debouncedFetch = useCallback(
    debounce(() => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;

      setState((slot) => {
        slot.fetching = true;
        slot.options = [];
      });

      get(config.url, {})
        .then((res) => {
          if (refFetchId.current === fetchId) {
            let options = res.results;

            if (config.optionsFormatter) {
              options = config.optionsFormatter(options);
            }

            setState((slot) => {
              slot.fetching = false;
              slot.options = options;
            });
          }
        })
        .catch((err) => {
          console.log("🚀 ~ get ~ err:", err);

          setState((slot) => {
            slot.fetching = false;
          });
        });
    }, 500),
    []
  );

  const notFoundContent = useMemo(() => {
    return state.fetching ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin style={{ margin: 33 }} />
      </div>
    ) : (
      <Empty />
    );
  }, [state.fetching]);

  return (
    <Select
      showSearch
      filterOption={false}
      value={value}
      options={state.options}
      allowClear={config.allowClear}
      mode={config.multiple && "multiple"}
      placeholder={config.placeholder || "请选择"}
      notFoundContent={notFoundContent}
      onSearch={debouncedFetch}
      onChange={onChange}
      style={{ width: 200, ...config.style }}
    />
  );
};

export default RemoteSearch;
