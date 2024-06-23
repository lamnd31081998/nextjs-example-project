"use client";

import { Layout } from "antd";
import HeaderComponent from "./header.component";
import FooterComponent from "./footer.component";
import SiderComponent from "./sider.component";
import "./../../app/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  height: "100vh",
};

const contentStyle: React.CSSProperties = {
  margin: 15,
};

export default function TemplateComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (!localStorage.getItem("user_info")) router.push("/auth/login");
    else {
      setIsShow(true);
      //@ts-ignore
      setUserInfo(JSON.parse(localStorage.getItem("user_info")).user);
    }
  }, []);

  const [isShow, setIsShow] = useState<boolean>(false);

  if (!isShow) return "";

  return (
    <Layout style={layoutStyle}>
      <SiderComponent />
      <Layout>
        <HeaderComponent user_info={userInfo} />
        <Content style={contentStyle}>{children}</Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
