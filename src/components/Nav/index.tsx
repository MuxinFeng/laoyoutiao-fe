import './index.less';
import React, { useState } from 'react';
import { Menu, Avatar, Row, Col, Button, Modal, Dropdown, message } from 'antd';
import { SwapOutlined, PoweroffOutlined } from '@ant-design/icons';
import { history } from 'umi';

const titleArr = [
  {
    label: '全部',
    value: 'AllKind',
  },
  {
    label: '财经',
    value: 'Finance',
  },
  {
    label: '彩票',
    value: 'Lottery',
  },
  {
    label: '房产',
    value: 'Property',
  },
  {
    label: '股票',
    value: 'Shares',
  },
  {
    label: '家居',
    value: 'Furnishing',
  },
  {
    label: '教育',
    value: 'Education',
  },
  {
    label: '科技',
    value: 'Technology',
  },
  {
    label: '社会',
    value: 'Sociology',
  },
  {
    label: '时尚',
    value: 'Fashion',
  },
  {
    label: '时政',
    value: 'Affairs',
  },
  {
    label: '体育',
    value: 'Sports',
  },
  {
    label: '星座',
    value: 'Constellation',
  },
  {
    label: '游戏',
    value: 'Game',
  },
  {
    label: '娱乐',
    value: 'Entertainment',
  },
  {
    label: '其他',
    value: 'Other',
  },
];

export default function IndexPage(props: any) {
  const { getMenu } = props;
  const menu = (
    <Menu>
      <Menu.Item icon={<SwapOutlined twoToneColor="#52c41a" />}>
        <a onClick={() => setUpAvatarMadal(true)}>升级头像</a>
      </Menu.Item>
      <Menu.Item icon={<PoweroffOutlined twoToneColor="#eb2f96" />}>
        <a onClick={() => setSignoutModal(true)}>退出登录</a>
      </Menu.Item>
    </Menu>
  );

  const [isSignoutModal, setSignoutModal] = useState(false);
  const [isUpAvatar, setUpAvatarMadal] = useState(false);

  const handleSignOut = () => {
    setSignoutModal(false);
    history.push('/login');
    message.success('成功注销～✌️');
  };

  const handleUpAvatar = () => {
    setUpAvatarMadal(false);
    message.success('成功升级头像');
  };

  // const GetRequest = () => {
  //   var url = location.search; //获取url中"?"符后的字串
  //   var theRequest = new Object();
  //   if (url.indexOf('?') != -1) {
  //     var str = url.substr(1);
  //     let strs = str.split('&');
  //     for (var i = 0; i < strs.length; i++) {
  //       theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
  //     }
  //   }
  //   return theRequest;
  // };

  return (
    <>
      <Row>
        <Col span={4}>
          <div className="logo">
            <h3>一起愉快的发帖吧～</h3>
          </div>
        </Col>
        <Col span={17}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['AllKind']}
            onClick={(e) => {
              const type = titleArr.filter((item) => item.value === e.key)[0]
                .label;

              getMenu(type);
              history.push(`/home?type=${e.key}`);
            }}
          >
            {titleArr.map((item) => {
              return <Menu.Item key={item.value}>{item.label}</Menu.Item>;
            })}
          </Menu>
        </Col>
        <Col span={3}>
          <div className="avatar">
            <Dropdown overlay={menu}>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Dropdown>
            <span style={{ marginLeft: '16px' }}>第一根老油条</span>
          </div>
        </Col>
      </Row>
      <Modal
        title="退出登录"
        visible={isSignoutModal}
        footer={[
          <Button onClick={() => setSignoutModal(false)}>取消</Button>,
          <Button type="primary" onClick={() => handleSignOut()}>
            确定
          </Button>,
        ]}
      >
        确定退出登录吗
      </Modal>
      <Modal
        title="升级"
        visible={isUpAvatar}
        footer={[
          <Button onClick={() => setUpAvatarMadal(false)}>取消</Button>,
          <Button type="primary" onClick={() => handleUpAvatar()}>
            确定
          </Button>,
        ]}
      >
        确定升级头像吗？
      </Modal>
    </>
  );
}
