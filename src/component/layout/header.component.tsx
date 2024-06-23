"use client";

import { Flex, Layout, Menu, MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
const { Header } = Layout;
import "./../../app/globals.css";
import Link from "next/link";

export default function HeaderComponent({
  user_info,
}: Readonly<{
  user_info: any;
}>) {
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    height: 64,
    padding: 0,
    alignItems: "flex-end",
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
  };

  const action = (e: any) => {
    console.log(e);
  };

  return (
    <Header style={headerStyle}>
      <Menu
        mode="horizontal"
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Menu.SubMenu
          title={user_info.name}
          icon={<SettingOutlined />}
          style={{ marginLeft: "auto" }}
        >
          <Menu.Item>
            <Link href={"#"}>Account</Link>
          </Menu.Item>
          <Menu.Item>
            <p>Logout</p>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
}
