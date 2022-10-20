import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'

export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')

    useEffect(() => {
        switch (pathname) {
            case "/listlist":
                setBreadName('Check Article List');
                break;
            case "/listtable":
                setBreadName('Check Article Table');
                break;
            case "/edit":
                setBreadName('Article editing');
                break;
            case "/means":
                setBreadName('Profile editing');
                break;
            default:
                setBreadName(pathname.includes('edit') ? 'Article editing' : "");
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{height: '30px', lineHeight: '30px'}}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

