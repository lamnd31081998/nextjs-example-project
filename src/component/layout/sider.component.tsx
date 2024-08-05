"use client";

import { Layout, Menu, MenuProps } from "antd";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import "./../../app/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const { Sider } = Layout;

export default function SiderComponent() {
  const router = useRouter();

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "60px",
    color: "#fff",
  };

  type MenuItem = Required<MenuProps>["items"][number];
  const [selected, setSelected] = useState<string>("");

  // useEffect(() => {
  // }, [])

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Homepage", "/dashbroad", <HomeOutlined />),
    getItem("Staff Management", "/staff", <TeamOutlined />)
  ];

  return (
    <Sider width="15vw" style={siderStyle}>
      <a href="/dashbroad">
        <img
          style={{ height: 60, margin: "auto" }}
          src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png"
        />
      </a>
      <Menu
        theme="dark"
        selectedKeys={[selected]}
        mode="inline"
        items={items}
        onSelect={(info) => {
          setSelected(info.key);
          console.log(info.key);
          router.push(info.key);
        }}
      />
    </Sider>
  );
}
