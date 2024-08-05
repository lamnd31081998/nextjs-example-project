"use client";

import { Layout } from "antd";
import HeaderComponent from "./header.component";
import FooterComponent from "./footer.component";
import SiderComponent from "./sider.component";
import "./../../app/globals.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NotficationComponent from "../shared/notification.component";
import { AppStore, makeStore } from "@/lib/store/index.store";
import { Provider } from "react-redux";
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
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    if (
      //@ts-ignore
      !localStorage.getItem("user_info") ||
      //@ts-ignore
      localStorage.getItem("user_info") == "null" ||
      //@ts-ignore
      !JSON.parse(localStorage.getItem("user_info"))?.user
    )
      router.push("/auth/login");
    else {
      setIsShow(true);
      //@ts-ignore
      setUserInfo(JSON.parse(localStorage.getItem("user_info")).user);
    }
  }, []);

  const [isShow, setIsShow] = useState<boolean>(false);

  if (!isShow) return "";

  return (
    <Provider store={storeRef.current}>
      <Layout style={layoutStyle}>
        <NotficationComponent />
        <SiderComponent />
        <Layout>
          <HeaderComponent user_info={userInfo} />
          <Content style={contentStyle}>{children}</Content>
          <FooterComponent />
        </Layout>
      </Layout>
    </Provider>
  );
}
