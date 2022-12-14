import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    }, [location.pathname])

    const handleClick = e => {
        navigate('/'+e.key)
        setDefaultKey(e.key)
    };
    return (
        <Menu
            onClick={handleClick}
            style={{ width: 180 }}
            selectedKeys={[defaultKey]}
            mode="inline"
            className='aside'
            theme="dark"
        >
            <Menu.Item key="listlist"><ReadOutlined /> Check Article List</Menu.Item>
            <Menu.Item key="listtable"><ReadOutlined /> Check Article Table</Menu.Item>
            <Menu.Item key="edit"><EditOutlined /> Article editing</Menu.Item>
            <Menu.Item key="means"><DatabaseOutlined /> Profile editing</Menu.Item>
        </Menu>
    )
}
