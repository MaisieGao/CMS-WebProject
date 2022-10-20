import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { GetUserDataApi, ChangeUserDataApi } from "../request/api";
import "./less/Means.less";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
  if (!isLt2M) {
    message.error("Please submit a photo that is less than 200kb!");
  }
  return isJpgOrPng && isLt2M;
}

function Means(props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    GetUserDataApi().then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        message.success("success");
        //  save to sessionStorage
        sessionStorage.setItem("username", res.data.username);
      }
    });
  }, []);

  //
  const onFinish = (values) => {
    if (
      values.username &&
      values.username !== sessionStorage.getItem("username") &&
      values.password.trim() !== ""
    ) {
      // submit form
      ChangeUserDataApi({
        username: values.username,
        password: values.password,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  // upload photo
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
        //
        localStorage.setItem("avatar", info.file.response.data.filePath);
        // use react-redux
        props.addKey();
      });
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="means">
      <Form
        name="basic"
        style={{ width: "400px" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="change username:" name="username">
          <Input placeholder="Please enter new username" />
        </Form.Item>

        <Form.Item label="change password:" name="password">
          <Input.Password placeholder="Please enter new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>Click below to change profile picture:</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "cms-token": localStorage.getItem("cms-token") }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey() {
      dispatch({ type: "addKeyFn" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Means);
