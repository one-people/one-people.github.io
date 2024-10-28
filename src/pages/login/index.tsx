import { useState } from 'react';
import { Message} from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.less";
import useFirstValueEffect from "@/hooks/useFirstValueEffect";

const FormTemp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    code: '',
  });
  const [codeTxt, setCodeTxt] = useState('获取验证码');
  const [errors, setErrors] = useState<any>({})
  //表单校验
  const validateForm = () => {
    let errors = {
      username: '',
      code: ''
    };
    let formIsValid = true;
    if (!formData.username) {
      formIsValid = false;
      errors.username = '手机号不能为空';
    } else {
      // 简单的邮箱格式校验
      let pattern = /^1[3-9]\d{9}$/;
      if (!pattern.test(formData.username)) {
        formIsValid = false;
        errors.username = '请输入正确的手机号';
      }
    }
    if (!formData.code) {
      formIsValid = false;
      errors.code = '验证码不能为空';
    }
    setErrors(errors);
    return formIsValid;
  };
  const validateFormUsername = () => {
    let errors = {
      username: '',
      code: ''
    };
    let formIsValid = true;
    if (!formData.username) {
      formIsValid = false;
      errors.username = '手机号不能为空';
    } else {
      // 简单的邮箱格式校验
      let pattern = /^1[3-9]\d{9}$/;
      if (!pattern.test(formData.username)) {
        formIsValid = false;
        errors.username = '请输入正确的手机号';
      }
    }
    setErrors(errors);
    return formIsValid;
  };  
  const validateFormCode = () => {
    let errors = {
      username: '',
      code: ''
    };
    let formIsValid = true;
    if (!formData.code) {
      formIsValid = false;
      errors.code = '验证码不能为空';
    }
    setErrors(errors);
    return formIsValid;
  };
  //提交登录
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (validateForm() && validateFormCode()) {
      // 表单校验通过，可以提交表单
      Message.success('表单校验通过，可以提交表单');
      // 页面跳转方法
      navigate('/')
    } 
  };
  useFirstValueEffect(formData.username,validateFormUsername)
  useFirstValueEffect(formData.code,validateFormCode)
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  //获取验证码
  const getCode = ()=>{
    let errors = {
      username: '',
      code: ''
    };
    let formIsValid = true;
    if (!formData.username) {
      errors.username = '手机号不能为空';
      formIsValid = false;
    } else {
      // 简单的邮箱格式校验
      let pattern = /^1[3-9]\d{9}$/;
      if (!pattern.test(formData.username)) {
        errors.username = '请输入正确的手机号';
        formIsValid = false;
      }
    }
    if(formIsValid){
      countDown()
    }else{
      setErrors(errors);
    }
    setErrors(errors);
  }
  //倒计时
  const countDown = ()=> {
    let times = 6;
    let interval = setInterval(()=>{
    if(times>0){
      times--
        setCodeTxt(times+'s');
      }else{
        setCodeTxt('重新获取');
        clearInterval(interval);
      }
    },1000)
  }

  return (
    <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <h1></h1>
          <div className={styles['line']}></div>
          <div className={styles['title']}>牛卡福业财一体化后台</div>
        </div>
        <div className={styles['login']}>
          <div className={styles['left']}>
            <div className={styles['img']}></div>
          </div>
          <div className={styles['right']}>
            <div className={styles['wrapper1']}>
              <div className={styles['title']}>模版项目</div>
              <div className={styles['content']}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className={styles['loginFormItem']}>
                      <i className={styles['iconPhone']}></i>
                      {/* <IconMobile className={styles['loginFormIcon']}/>  */}
                      <input type="text" name="username" value={formData.username} 
                      onChange={handleChange}  className={styles['loginFormInput']}
                      placeholder='请输入手机号'
                      />
                    </div>
                    <div className={styles['errorMsg']}>{errors.username}</div>
                  </div>
                  <div>
                    <div className={styles['loginFormItem']} >
                      {/* <IconApps className={styles['loginFormIcon']}/>  */}
                      <i className={styles['iconCode']}></i>
                      <input type="text" name="code" value={formData.code} 
                        onChange={handleChange}  
                        className={styles['loginFormInput']}
                        placeholder='请输入验证码'
                        />
                        
                        <div className={styles['getCodeBtn']} onClick={getCode}> {codeTxt} </div>
                      </div>
                      <div className={styles['errorMsg']}>{errors.code}</div>
                  </div>
                  <div>
                    <button type="submit" style={{width:'100%'}} className={styles['btn']}
                    >登录</button>
                    {/* <Button type='primary' style={{width:'100%'}}>登录</Button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      
    </div>

  );
};

export default FormTemp;