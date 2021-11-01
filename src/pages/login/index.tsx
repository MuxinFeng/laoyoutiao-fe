import './index.less';
import { history } from 'umi';
import { useState } from 'react';
import { Form, Avatar, Input, Button, Modal, message } from 'antd';
import backgroundPic from '../../images/homeLogo.jpeg';
import { BaseUrl } from '../../constants/api';
import axios from 'axios';

export default function IndexPage() {
  const [isRegister, setRegisterModal] = useState(false);
  const [form] = Form.useForm();
  const [formLogin] = Form.useForm();

  const handleNavToHomePage = () => {
    const { password: passWord, userName } = formLogin.getFieldsValue(true);
    if (passWord && userName) {
      // fetch(`${BaseUrl}/employee/login`, {
      //   method: 'post',
      //   body: JSON.stringify({ password, userName }),
      // })
      //   .then((response) => {
      //     console.log(response.json());
      //     if (response.status === 200) {
      //       message.success('登陆成功');
      //       // history.push('/home/AllKind');
      //     }
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     localStorage.setItem('userInfo', {
      //       passWord: password,
      //       userName: userName,
      //     });
      //   })
      axios({
        url: `${BaseUrl}/employee/login`,
        method: 'POST',
        data: { passWord, userName },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 0 && response.data) {
            message.success('登陆成功');
            history.push('/home?type=AllKind');
            const { userName, passWord, id, avatar } = response.data.data;
            localStorage.setItem('passWord', passWord);
            localStorage.setItem('userName', userName);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('id', id);
          } else {
            message.error(response.data.message);
            return;
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    } else {
      message.error('登陆信息填写有误，请重新填写');
    }
  };

  const handleRegister = () => {
    const { email, password: passWord, userName } = form.getFieldsValue(true);
    const body = JSON.stringify({ email, passWord, userName });
    if (email && passWord && userName) {
      axios({
        url: `${BaseUrl}/employee/register`,
        method: 'POST',
        data: { email, passWord, userName },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 0) {
            message.success('注册成功');
            setRegisterModal(false);
          }
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    } else {
      message.error('注册信息填写有误，请重新填写');
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundPic})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // -webkit-background-size: 'cover',
        //  -o-background-size: 'cover'
        backgroundPosition: 'center 0',
      }}
    >
      <div className="content">
        <div className="avatar">
          <div className="avatar-img" style={{ width: '400px' }}>
            <Avatar size={100} src="https://joeschmoe.io/api/v1/random" />
          </div>
          <div className="avatar-title" style={{ width: '400px' }}>
            <h2>welcome laoyoutiao</h2>
          </div>
        </div>
        <div className="form">
          <Form
            form={formLogin}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="userName"
              key="username"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              key="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
        <div className="button">
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: '32px', width: '80%' }}
            onClick={() => handleNavToHomePage()}
          >
            登陆
          </Button>
        </div>
        <div className="describe">
          <a
            style={{ width: '100%', margin: '32px', textAlign: 'center' }}
            onClick={() => setRegisterModal(true)}
          >
            注册账号
          </a>
        </div>
      </div>
      <Modal
        destroyOnClose
        title="我的评价"
        visible={isRegister}
        onCancel={() => setRegisterModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setRegisterModal(false)}>
            取消
          </Button>,
          <Button key="confirm" type="primary" onClick={() => handleRegister()}>
            确认注册
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            name="userName"
            label="账号"
            key="userName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            key="password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            key="email"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
