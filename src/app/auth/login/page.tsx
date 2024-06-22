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
import { useEffect, useState } from "react";
import React from "react";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user_info")) router.push("/dashbroad");
    else setIsShow(true);
  }, []);

  type LoginField = {
    username: string;
    password: string;
    remember?: string;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    type: "error" | "success",
    title: string,
    message: string
  ) => {
    api[type]({
      message: title,
      description: message,
      duration: 1.5,
    });
  };

  const onFinish: FormProps<LoginField>["onFinish"] = async (values) => {
    setLoading(true);

    let login_response = await AuthApi.getInstance.Login(values);

    try {
      switch (login_response.status) {
        case HttpStatusCode.Ok: {
          openNotification('success', 'Success', login_response.message);

          localStorage.setItem(
            "user_info",
            JSON.stringify(login_response.data)
          );

          setTimeout(() => {
            router.push("/dashbroad");
          }, 500);

          break;
        }
        default: {
          openNotification("error", "Error", login_response.message);
          break;
        }
      }
    } catch (e) {
      console.log("onFinish Err === ", e);
    }

    setLoading(false);
  };

  const onFinishFailed: FormProps<LoginField>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo.values);
  };

  if (!isShow) return "";

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
            <Form.Item<LoginField>
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

            <Form.Item<LoginField>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password need at least 6 chars" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<LoginField> name="remember" valuePropName="checked">
              <Checkbox className="flex justify-end">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
                <Button type="primary" htmlType="submit" className="w-[100px]">
                  Login
                </Button>
              </Spin>
            </Form.Item>

            <Link href={"/auth/register"} className="text-center">
              No Account? Register Now
            </Link>
          </Form>
        </Card>
      </div>
    </>
  );
}
