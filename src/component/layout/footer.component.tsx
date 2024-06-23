"use client";

import { Layout } from "antd";
const { Footer } = Layout;

export default function FooterComponent() {
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    backgroundColor: "#fff",
  };

  return <Footer style={footerStyle}>Footer</Footer>;
}
