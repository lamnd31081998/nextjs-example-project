"use client";

import { Col, GetProp, Row, Upload, UploadFile, UploadProps, Image, Form, FormProps, Spin, Button, Input } from "antd";
import { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import "./../globals.css";
import "./user.css";
import { UserApi } from "@/api/user.api";
import { HttpStatusCode } from "axios";
import { useAppDispatch } from "@/lib/store/index.store";
import { updateNotificationState } from "@/lib/store/notification.store";
import FormData from "form-data";

export default function User() {
  const dispatch = useAppDispatch();
  
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    //@ts-ignore
    ...(JSON.parse(localStorage.getItem("user_info"))?.user?.avatar_url) && [{
      uid: '-1',
      //@ts-ignore
      name: JSON.parse(localStorage.getItem("user_info")).user.avatar_url.split('/')[JSON.parse(localStorage.getItem("user_info")).user.avatar_url.split('/').length - 1],
      status: 'done',
      //@ts-ignore
      url:JSON.parse(localStorage.getItem("user_info")).user.avatar_url
    }] || []
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoField>({
    //@ts-ignore
    name: JSON.parse(localStorage.getItem("user_info")).user.name,
    //@ts-ignore
    avatar_url: JSON.parse(localStorage.getItem("user_info")).user.avatar_url,
    //@ts-ignore
    // email: JSON.parse(localStorage.getItem("user_info")).user.email,
  });

  type UserInfoField = {
    avatar_url?: string;
    name: string;
    // email?: string;
  };

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async () => {
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (fileList.length > 0) {
      setUserInfo({
        ...userInfo,
        avatar_url: fileList[0].url || (fileList[0].preview as string) || (await getBase64(fileList[0].originFileObj as FileType)),
      });
    }
  };

  const handleRemove: UploadProps["onRemove"] = async (file) => {
    setUserInfo({
      ...userInfo,
      avatar_url: ''
    })
  };

  const onFinish: FormProps<UserInfoField>["onFinish"] = async (values) => {
    setLoading(true);

    //@ts-ignore
    let access_token = JSON.parse( localStorage.getItem("user_info")).access_token;

    let dataSend = new FormData();
    dataSend.append('name', values.name);
    if (fileList?.length > 0 && !fileList[0]?.url) {
      //@ts-ignore
      dataSend.append("file", fileList[0].originFileObj as Blob);
    }
    if (fileList?.length > 0 && fileList[0].url) {
      dataSend.append("avatar_url", fileList[0].url);
    }

    let update_response = await UserApi.getInstance.UpdateByToken(dataSend, access_token);

    try {
      switch(update_response.status) {
        case HttpStatusCode.Ok: {
          dispatch(
            updateNotificationState({
              type: "success",
              title: "Success",
              message: update_response.message,
            })
          );

          localStorage.setItem(
            "user_info",
            JSON.stringify({
              //@ts-ignore
              ...JSON.parse(localStorage.getItem("user_info")),
              user: {
                //@ts-ignore
                ...JSON.parse(localStorage.getItem("user_info")).user,
                ...update_response.data
              }
            })
          );

          break;
        }
        default: {
          dispatch(
            updateNotificationState({
              type: "error",
              title: "Error",
              message: update_response.message,
            })
          );

          break;
        }
      }
    }
    catch(e) {
      console.log("onFinish Err === ", e);
    }

    setLoading(false);
  };

  const onFinishFailed: FormProps<UserInfoField>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo.values);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Row>
        <Col span={4}></Col>
        <h1>User Info</h1>
      </Row>
      <Form
        name="userInfo"
        initialValues={userInfo}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row style={{ marginTop: 20 }}>
          <Col span={5}></Col>
          <Col span={4}>
            <Form.Item<UserInfoField> name="avatar_url">
              <Upload
                className="upload-component"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
              >
                {fileList.length >= 1? null : uploadButton}
              </Upload>
              {userInfo?.avatar_url && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setUserInfo(() => ({ ...userInfo, avatar_url: "" })),
                  }}
                  src={userInfo.avatar_url}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<UserInfoField>
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            {/* <Form.Item<UserInfoField> name="email">
              <Input placeholder="Email" />
            </Form.Item> */}

            <Form.Item>
              <Spin
                spinning={loading}
                indicator={<LoadingOutlined spin />}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[80px] float-end"
                >
                  Update
                </Button>
              </Spin>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
