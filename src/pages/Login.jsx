import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import "./less/Login.less"
import logoImg from '../assets/logo.png'
import {LoginApi} from '../request/api'

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success('success')
        // save data
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
      
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      }else{
        message.error('failed')
      }
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img width={300} height={200} src={logoImg} alt="" />
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
                message: 'Please enter username！',
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

          <Form.Item>
            <Link to="/register">No account yet? Please register</Link>
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>Sign In</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
