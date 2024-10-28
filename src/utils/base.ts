import { TObject } from '@/types';
import { Modal, Notification} from '@arco-design/web-react';

/**
 * 消息通知
 * content：提示内容
 * type:分别为：info, success, warning, error, normal；默认normal
 **/
export function showMessage(type:string,content:string,option?:TObject ) {
  let options={
    content,
    ...option
  }
  switch (type) {
    case "success":
      Notification.success(options)
      break;
    case "warning":
      Notification.warning(options)
      break;
    case "error":
      Notification.error(options)
      break;
    case "info":
      Notification.info(options)
      break;
    default:
      Notification.normal(options)
      break;
  }
}

/**
 * 消息提示对话框，只有一个确认按钮
 * content：提示内容
 * type:分别为：info, success, warning, error, normal；默认normal
 **/
export function showAlert(type:string,content:string,option?:TObject) {
  let options={
    title:'提示',
    content,
    ...option
  }
  switch (type) {
    case "success":
      Modal.success(options);
      break;
    case "warning":
      Modal.warning(options);
      break;
    case "error":
      Modal.error(options);
      break;
    case "info":
      Modal.info(options);
      break;
    default:
      Modal.info(options);
      break;
  }
}

/**
 * 消息提示对话框，只有一个确认按钮
 * content：提示内容
 **/
export function showConfirm(content:string,option?:TObject) {
  let options={
    title:'提示',
    content,
    ...option
  }
  return new Promise((resolve) => {
    Modal.confirm({
      ...options,
      onOk: () => {
        resolve('')
      }
    });
  })
}

/**
 * 下载跨域文件
 * url：下载链接
 */
export function downloadFile(url:string) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'

  xhr.onload = function () {
    if (xhr.status === 200) {
      let blob = xhr.response
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'file'
      link.click()
    }
  }

  xhr.send()
}
