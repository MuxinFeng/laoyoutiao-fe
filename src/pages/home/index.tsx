import './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Layout,
  List,
  Avatar,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Checkbox,
  message,
} from 'antd';
import { MessageOutlined, LikeOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Nav from '../../components/Nav/index';
import { BaseUrl } from '../../constants/api';
import uploadTo7N from './uploadTo7N';
import axios from 'axios';

const { Header, Content } = Layout;
const { TextArea } = Input;

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `这是标题${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      '这是作者的引言；这是作者的引言；这是作者的引言；这是作者的引言；这是作者的引言；这是作者的引言；这是作者的引言',
    content:
      '这句话是热评；这句话是热评；这句话是热评；这句话是热评；这句话是热评；这句话是热评；这句话是热评；',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function IndexPage() {
  const [isPublishModal, setPublishModal] = useState(false);
  const [type, setKind] = useState('AllKind');
  const [picList, setPicList] = useState<any>([]);
  const [form] = Form.useForm();
  const [tieziList, setTieziList] = useState([]);

  window.addEventListener('hashchange', () => {
    console.log('12');
  });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = () => {
    // let temp = window.location.href;
    // let query = temp.split('?type=')[1];
    // console.log(query);
    let id = localStorage.getItem('id');
    let myUrl = `${BaseUrl}/post/list?tag=${type}&author=${id}`;
    if (type === '全部') {
      console.log('quanbu ');
      myUrl = `${BaseUrl}/post/list?author=${id}`;
    }

    axios({
      url: myUrl,
      method: 'GET',
    })
      .then((response) => {
        console.log(response.data.data);
        setTieziList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const handleNavToDetail = (id) => {
    history.push(`/article/${id}`);
  };

  const handleAddLike = () => {
    console.log('dianzain');
  };

  const handlePublish = () => {
    const {
      title: postTitle,
      describe: content,
      isAnonyme,
      picList,
    } = form.getFieldsValue(true);
    const authorName = window.localStorage.getItem('userName') || '长腿洛伦兹';
    const authorId = window.localStorage.getItem('authorId') || '202160114';

    if (postTitle && content) {
      axios({
        url: `${BaseUrl}/post/create`,
        method: 'POST',
        data: { postTitle, content, authorId, authorName },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setPublishModal(false);
            message.info('发布成功👍');
          }
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
      // fetch(`${BaseUrl}/post/create`, {
      //   method: 'post',
      //   mode: 'cors',
      //   body: JSON.stringify({ postTitle, content, authorId, authorName }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
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
      //   })
      //   .catch((error) => {
      //     message.error(error.message);
      //   });
    } else {
      message.error('登陆信息填写有误，请重新填写');
    }

    console.log(form.getFieldsValue(true));
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // const uploadHandler = ({
  //   file,
  //   onSuccess,
  //   onError,
  //   onProgress,
  // }: any): any => {
  //   if (!file) return false;
  //   if (file.size > 1024 * 1024) {
  //     message.error('文件过大啦');
  //     return false;
  //   }
  //   uploadTo7N(file, { onSuccess, onError, onProgress })
  //     .then((response) => {
  //       const { url } = response;
  //       setEditorState(
  //         ContentUtils.insertMedias(editorState, [
  //           {
  //             type: 'IMAGE',
  //             url,
  //           },
  //         ]),
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Nav getMenu={setKind}></Nav>
      </Header>
      <Content
        style={{
          padding: '5% 20%',
          backgroundColor: '#f4f5f5',
          minHeight: '100vh',
        }}
      >
        <Button
          shape="round"
          size="large"
          type="primary"
          className="publish-button"
          onClick={() => {
            setPublishModal(true);
          }}
        >
          🙋‍♂️🙋我有话说
        </Button>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={tieziList}
          footer={<></>}
          renderItem={(item: any) => (
            <List.Item
              style={{ backgroundColor: '#fff' }}
              key={item.postNo}
              actions={[
                <span onClick={() => handleAddLike()}>
                  <IconText
                    icon={LikeOutlined}
                    text={item.likeCount || 0}
                    key="list-vertical-like-o"
                  />
                </span>,
                <IconText
                  icon={MessageOutlined}
                  text="1"
                  key="list-vertical-message"
                />,
              ]}
            >
              <div onClick={() => handleNavToDetail(item.postNo)}>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href={item.href}>{item.postTitle}</a>}
                  description={item.subTitle}
                />
                {item.content}
              </div>
            </List.Item>
          )}
        />

        <Modal
          destroyOnClose
          width="80%"
          visible={isPublishModal}
          onCancel={() => setPublishModal(false)}
          title="我有话说🙋🙋‍♂️"
          footer={[
            <Button key="cancel" onClick={() => setPublishModal(false)}>
              取消
            </Button>,
            <Button
              key="confirm"
              type="primary"
              onClick={() => handlePublish()}
            >
              发布
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
              name="title"
              key="title"
              label="标题"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="describe"
              key="describe"
              label="描述"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="isAnonyme"
              key="isAnonyme"
              label="是否匿名"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="picList"
              key="picList"
              label="有图有真相"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="http://zaihuiba.com/"
                listType="picture-card"
                fileList={picList}
                // customRequest={uploadHandler}
                onChange={({ fileList }) => {
                  setPicList(fileList);
                }}
              >
                {picList.length >= 4 ? null : (
                  <div key="index">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
