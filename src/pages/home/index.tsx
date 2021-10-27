import './index.less';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';

const { Header, Content, Footer } = Layout;
const titleArr = [
  {
    label: '游戏',
    value: 'game1',
  },
  {
    label: '户外',
    value: 'game2',
  },
  {
    label: '财经',
    value: 'game3',
  },
  {
    label: '游戏',
    value: 'game4',
  },
  {
    label: '游戏',
    value: 'game5',
  },
  {
    label: '游戏',
    value: 'game6',
  },
  {
    label: '游戏',
    value: 'game7',
  },
  {
    label: '游戏',
    value: 'game8',
  },
  {
    label: '游戏',
    value: 'game9',
  },
];

export default function IndexPage() {
  return (
    <Layout className="layout">
      <Header>
        <div style={{ width: 'calc(100% - 120px)' }}>
          <div className="logo">
            <h2>laosiji</h2>
          </div>

          <Menu mode="horizontal" defaultSelectedKeys={['2']}>
            {titleArr.map((item) => {
              return <Menu.Item key={item.value}>{item.label}</Menu.Item>;
            })}
          </Menu>
        </div>
        <div className="avatar">
          {/* <h2>laosiji2</h2> */}
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {/* <div className="site-layout-content">Content</div> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
