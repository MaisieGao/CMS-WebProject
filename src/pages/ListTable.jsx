import React, { useState, useEffect } from "react";
import "./less/ListTable.less";
import { Table, Button, Space, message } from "antd";
import moment from "moment";
import { ArticleListApi, ArticleDelApi } from "../request/api";
import { useNavigate } from "react-router-dom";

// 标题组件
function MyTitle(props) {
  return (
    <div>
      <a
        className="table_title"
        href={"http://localhost:3000/article/" + props.id}
        target="_blank"
      >
        {props.title}
      </a>
      <p style={{ color: "#999" }}>{props.subTitle}</p>
    </div>
  );
}

export default function ListTable() {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  // page seperation
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize,
    }).then((res) => {
      if (res.errCode === 0) {
        // 更改pagination
        let { num, count, total } = res.data;
        setPagination({ current: num, pageSize: count, total });
        // deep copy
        let newArr = JSON.parse(JSON.stringify(res.data.arr));

        let myarr = [];

        newArr.map((item) => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: (
              <MyTitle
                id={item.id}
                title={item.title}
                subTitle={item.subTitle}
              />
            ),
          };
          myarr.push(obj);
        });
        setArr(myarr);
      }
    });
  };

  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize);
  }, []);

  const pageChange = (arg) => getArticleList(arg.current, arg.pageSize);

  // delete
  const delFn = (id) => {
    ArticleDelApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success("success");

        getArticleList(1, pagination.pageSize);
      } else {
        message.success("faild");
      }
    });
  };

  // for every column
  const columns = [
    {
      dataIndex: "mytitle",
      key: "mytitle",
      width: "60%",
      render: (text) => <div>{text}</div>,
    },
    {
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{text}</p>,
    },
    {
      key: "action",
      render: (text) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => navigate("/edit/" + text.key)}
            >
              Edit
            </Button>
            <Button type="danger" onClick={() => delFn(text.key)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="list_table">
      <Table
        showHeader={false}
        columns={columns}
        dataSource={arr}
        onChange={pageChange}
        pagination={pagination}
      />
    </div>
  );
}
