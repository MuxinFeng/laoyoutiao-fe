import './index.less';
import React, { useState, createElement, useEffect } from 'react';
import {
  Layout,
  List,
  Row,
  Col,
  Checkbox,
  Button,
  Modal,
  Image,
  Input,
  Tooltip,
  Comment,
  Divider,
  Form,
  message,
} from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';
import moment from 'moment';
import Nav from '../../components/Nav/index';
import { BaseUrl } from '../../constants/api';
import axios from 'axios';

const { Header, Content } = Layout;
const { TextArea } = Input;

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const pic = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

export default function IndexPage() {
  const [isReplyModal, setReplyModal] = useState(false);
  const [formComment] = Form.useForm();
  const [picList, setPicList] = useState<any>([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState<any>();
  const [postId] = useState('');
  const [commentCategory, useCommentCategory] = useState('POST');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let temp = window.location.href;
    let query = temp.split('/article/')[1];
    console.log(query);
    axios({
      url: `${BaseUrl}/post/${query}`,
      method: 'GET',
    })
      .then((response) => {
        console.log(response.data.data.comments);
        setDetail(response.data.data);
        let tempList: any[] = [];
        response.data.data.comments.map((item: any) => {
          tempList.push({
            actions: [
              <span
                key="comment-list-reply-to-0"
                onClick={(item) => {
                  console.log(item);
                }}
              >
                回复
              </span>,
            ],
            author: item.authorName,
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{item.comment}</p>,
            commentList: item.commentList,
            datetime: (
              <Tooltip
                title={moment()
                  .subtract(1, 'days')
                  .format('YYYY-MM-DD HH:mm:ss')}
              >
                <span>{item.updatedAt}</span>
              </Tooltip>
            ),
          });
        });
        setComments(tempList);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">回复</span>,
  ];

  const handleConfirmComment = () => {
    const { describe, isAnonyme } = formComment.getFieldsValue(true);
    axios({
      url: `${BaseUrl}/comment/create`,
      method: 'POST',
      data: {
        comment: describe,
        postId: parseInt(detail.postId),
        commentCategory,
        authorName: detail.authorName,
        authorId: parseInt(detail.authorId),
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setReplyModal(false);
          message.info('发布成功👍');
        } else {
          message.error('发布失败，请重试');
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Nav></Nav>
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
            setReplyModal(true);
          }}
        >
          🙋‍♂️🙋我也说两句
        </Button>
        <div style={{ backgroundColor: '#fff' }}>
          <h2 style={{ padding: '24px 32px 0 32px' }}>{detail?.postTitle}</h2>
          <p style={{ padding: '24px 32px 32px 32px' }}>{detail?.content}</p>
          <Row
            gutter={8}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {pic.map((item) => {
              return (
                <Col span={5}>
                  <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"></Image>
                </Col>
              );
            })}
          </Row>
          <Divider />
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <li style={{ margin: '0 32px 0 32px' }}>
                <Comment
                  actions={actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                >
                  {item.commentList.map((item1) => {
                    return (
                      <Comment
                        // actions={actions}
                        author={item1.authorName}
                        avatar="https://joeschmoe.io/api/v1/random"
                        content={item1.comment}
                        datetime={item1.updatedAt}
                      ></Comment>
                    );
                  })}
                </Comment>
              </li>
            )}
          />
        </div>
        <Modal
          destroyOnClose
          title="我的评价"
          width={'80%'}
          onCancel={() => setReplyModal(false)}
          visible={isReplyModal}
          footer={[
            <Button key="cancel" onClick={() => setReplyModal(false)}>
              取消
            </Button>,
            <Button
              key="confirm"
              type="primary"
              onClick={() => handleConfirmComment()}
            >
              确定
            </Button>,
          ]}
        >
          <Form
            form={formComment}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
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
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
