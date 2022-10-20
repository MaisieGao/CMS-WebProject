import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import moment from 'moment'

import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'



export default function Edit() {
  const [content, setContent] = useState('')
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const params = useParams()

  const handleChangeFunction = (text) => {
    setContent(text.target.value);
  };
  const dealData = (errCode, msg) => {
    setIsModalVisible(false); 
    if (errCode === 0) {
      message.success('success')
      setTimeout(() => {
      
        navigate('/listlist')
      }, 1500)
    } else {
      message.error('failed')
    }
  }


  const handleOk = () => {
    form
      .validateFields()    
      .then((values) => {
        // form.resetFields();  
        let { title, subTitle } = values;
        
        if (params.id) {
         
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(res => dealData(res.errCode, res.message))
        } else {
        
          ArticleAddApi({ title, subTitle, content }).then(res => dealData(res.errCode, res.message))
        }
      })
      .catch(() => false);
  };
    //if there is a id, we search 
    // if (params.id) {
    //   ArticleSearchApi({ id: params.id }).then(res => {
    //     if (res.errCode === 0) {
    //       setContent(res.data.content)
    //       setTitle(res.data.title)
    //       setSubTitle(res.data.subTitle)
    //     }
    //   })
    // }

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title={params.id ? 'Article Editing':'Article Adding'}
        subTitle={"Current date " + moment(new Date()).format("YYYY-MM-DD")}
        extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>Submit Article</Button>}
      ></PageHeader>
      <textarea 
        id="div1"
        onChange={handleChangeFunction}
        value={content}
        style={{width:'100%',height:300}}
        />
      <Modal zIndex={99999} title="write article title" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="submit" cancelText="cancel">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
          initialValues={{ title, subTitle }}
        >
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: true, message: 'Please write title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="subtitle"
            name="subTitle"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
