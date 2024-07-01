"use client";

import { Button, Card, Form, FormProps, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./../../globals.css";
import { AuthApi } from "@/api/auth.api";
import { HttpStatusCode } from "axios";
import { useAppDispatch } from "@/lib/store/index.store";
import { updateNotificationState } from "@/lib/store/notification.store";

export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //@ts-ignore
    if (localStorage.getItem("user_info") && localStorage.getItem("user_info") != "null" && JSON.parse(localStorage.getItem("user_info"))?.user) router.push("/dashbroad");
    else setIsShow(true);
  }, []);

  type RegisterField = {
    username: string;
    name: string;
    password: string;
    confirm_password: string;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const onFinish: FormProps<RegisterField>["onFinish"] = async (values) => {
    setLoading(true);

    let register_response = await AuthApi.getInstance.Register(values);

    try {
      switch (register_response.status) {
        case HttpStatusCode.Created: {
          dispatch(
            updateNotificationState({
              type: "success",
              title: "Success",
              message: register_response.message,
            })
          );

          setTimeout(() => {
            router.push("/auth/login");
          }, 1000);

          break;
        }
        default: {
          dispatch(
            updateNotificationState({
              type: "error",
              title: "Error",
              message: register_response.message,
            })
          );

          break;
        }
      }
    } catch (e) {
      console.log("onFinish Err === ", e);
    }

    setLoading(false);
  };

  const onFinishFailed: FormProps<RegisterField>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo.values);
  };

  if (!isShow) return "";

  return (
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
          <Form.Item<RegisterField>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item<RegisterField>
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item<RegisterField>
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password need at least 6 chars" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item<RegisterField>
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
  );
}
