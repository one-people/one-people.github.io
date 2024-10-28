import { Upload } from "@arco-design/web-react";
import { useEffect, useState } from "react";

const CustomUpload = ({ value, onChange, url, ...others }: any) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fileList = value || [];
    setFileList(fileList);
  }, []);

  const handleChange = (fileList: any) => {
    setFileList(fileList);
    onChange?.(fileList);
  };

  const handleCustomRequest = (option: any) => {
    const { onProgress, onError, onSuccess, file } = option;

    const xhr = new XMLHttpRequest();

    if (xhr.upload) {
      xhr.upload.onprogress = function (event) {
        let percent: any;

        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100;
        }

        onProgress(parseInt(percent, 10), event);
      };
    }

    xhr.onerror = function error(e) {
      onError(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }

      onSuccess(xhr.responseText, xhr);
    };

    const formData = new FormData();
    formData.append("file", file);
    xhr.open("post", url, true);
    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      },
    };
  };

  return (
    <div>
      <Upload
        {...others}
        fileList={fileList}
        onChange={handleChange}
        customRequest={handleCustomRequest}
      />
    </div>
  );
};

export default CustomUpload;
