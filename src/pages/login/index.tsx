import './index.less';
import { Form, Avatar, Input, Button } from 'antd';
import { history } from 'umi';

export default function IndexPage() {
  const handleNavToHomePage = () => {
    history.push('/home');
  };
  return (
    <div className="login-page">
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
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
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
          <a style={{ width: '100%', margin: '32px', textAlign: 'center' }}>
            注册账号
          </a>
        </div>
      </div>
    </div>
  );
}
