"use client";

import { Button, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApi } from "@/api/auth.api";
import { HttpStatusCode } from "axios";

export default function DashBroad() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user_info")) router.push("/auth/login");
    else setIsShow(true);
  }, []);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const logout = async () => {
    let user_info: any = localStorage.getItem("user_info");
    if (!user_info) {
      router.push("/auth/login");
      return;
    }

    user_info = JSON.parse(user_info);
    if (!user_info?.access_token) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    let logout_response = await AuthApi.getInstance.Logout(
      user_info.access_token
    );

    try {
      switch (logout_response.status) {
        case HttpStatusCode.Ok: {
          localStorage.removeItem("user_info");
          router.push("auth/login");

          break;
        }
        default: {
          openNotification("error", "Error", logout_response.message);
          break;
        }
      }
    } catch (e) {
      console.log("Logout Err === ", e);
    }

    setLoading(false);
  };

  if (!isShow) return "";

  return (
    <>
      {contextHolder}
      <p>Dashbroad</p>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Button type="primary" danger onClick={logout}>
          Logout
        </Button>
      </Spin>
    </>
  );
}
