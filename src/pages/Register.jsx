import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import "./less/Login.less"
import logoImg from '../assets/logo.png'
import {RegisterApi} from '../request/api'

export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        console.log(res.message)
        message.success('success');
        // 
        setTimeout(()=>navigate('/login'), 1500)
      }else{
        message.error('failed');
      }
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} width={300} height={200} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter username',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Please enter username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter password',
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please enter password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please reconfirm password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please enter the same password'));
                },
              }),
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Please confirm your password" />
          </Form.Item>

          <Form.Item>
            <Link to="/login">Already registered? Please sign in</Link>
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
