"use client";

import { Button, Card, Form, FormProps, Input, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./../../globals.css";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user_info")) router.push("/dashbroad");
    else setIsShow(true);
  }, []);

  type FieldType = {
    username: string;
    name: string;
    password: string;
    confirm_password: string;
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
      duration: 1,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);

    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
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
          title="REGISTER TO SYSTEM"
          className="text-center shadow-lg shadow-gray-300 w-[400px]"
        >
          <Form
            name="register"
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

            <Form.Item<FieldType>
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password need at least 6 chars" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<FieldType>
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
                { min: 6, message: "Password need at least 6 chars" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password and Confirm Password Unmatch")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
              <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
                <Button type="primary" htmlType="submit" className="w-[100px]">
                  Register
                </Button>
              </Spin>
            </Form.Item>

            <Link href="/auth/login" className="text-center">
              Already Has Account? Login Now
            </Link>
          </Form>
        </Card>
      </div>
    </>
  );
}
