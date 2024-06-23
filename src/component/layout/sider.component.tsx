"use client";

import { Layout } from "antd";
const { Sider } = Layout;

export default function SiderComponent() {
  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
  };

  return (
    <Sider width="15vw" style={siderStyle}>
      Sider
    </Sider>
  );
}
