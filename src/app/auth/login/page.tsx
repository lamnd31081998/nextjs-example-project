"use client";

import {
  Button,
  Card,
  Checkbox,
  Form,
  FormProps,
  Input,
  Spin,
  notification,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthApi } from "@/api/auth.api";
import "./../../globals.css";
import { useState } from "react";
import React from "react";
import { HttpStatusCode } from "axios";
import { redirect } from "next/navigation";

export default function Login() {
  type FieldType = {
    username: string;
    password: string;
    remember?: string;
  };

  const [loading, setLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message: string) => {
    api["error"]({
      message: "Error",
      description: message,
      duration: 1,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);

    let login_response = await AuthApi.getInstance.Login({
      username: values.username,
      password: values.password,
    });

    switch (login_response.status) {
      case HttpStatusCode.Ok: {
        localStorage.setItem("user_info", JSON.stringify(login_response.data));

        redirect("/dashbroad");
      }
      default: {
        openNotification(login_response.message);
        break;
      }
    }

    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo.values);
  };

  return (
    <>
      {contextHolder}
      <div className="w-screen h-screen flex justify-center items-center">
        <Card
          title="LOGIN TO SYSTEM"
          className="text-center shadow-lg shadow-gray-300 w-[400px]"
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <a href="#" className="flex justify-end mb-2">
              Forgot Password?
            </a>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password need at least 6 chars" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox className="flex justify-end">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
                <Button type="primary" htmlType="submit" className="w-[100px]">
                  Login
                </Button>
              </Spin>
            </Form.Item>

            <a href="#" className="text-center">
              No Account? Register Now
            </a>
          </Form>
        </Card>
      </div>
    </>
  );
}
