"use client";

import { ConfigProvider, Layout, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./../../app/globals.css";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/api/auth.api";
import { useAppDispatch } from "@/lib/store/index.store";
import { updateNotificationState } from "@/lib/store/notification.store";
const { Header } = Layout;

export default function HeaderComponent({
  user_info,
}: Readonly<{
  user_info: any;
}>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const logout = async () => {
    let access_token = JSON.parse(
      //@ts-ignore
      localStorage.getItem("user_info")
    ).access_token;

    let logout_response = await AuthApi.getInstance.Logout(access_token);

    try {
      dispatch(
        updateNotificationState({
          type: "success",
          title: "Success",
          message: logout_response.message,
        })
      );
      localStorage.removeItem("user_info");

      setTimeout(() => {
        router.push("auth/login");
      }, 1000);
    } catch (e) {
      dispatch(
        updateNotificationState({
          type: "error",
          title: "Error",
          message: logout_response.message,
        })
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: "#001529",
            itemColor: "#fff",

            horizontalItemHoverBg: "#1677ff",
            horizontalItemSelectedBg: "#1677ff",
            itemSelectedColor: "#fff",

            popupBg: "#001529",

            itemHoverColor: "#fff",
            itemHoverBg: "#1677ff",

            itemSelectedBg: "#1677ff",
          },
        },
      }}
    >
      <Header style={headerStyle}>
        <Menu
          mode="horizontal"
          style={{
            flex: "auto",
            minWidth: 0,
          }}
        >
          <Menu.SubMenu
            key={"setting"}
            title={user_info.name}
            icon={<SettingOutlined />}
            style={{ marginLeft: "auto" }}
          >
            <Menu.Item
              key={"account_info"}
              onClick={() => {
                router.push("/user");
              }}
            >
              Account
            </Menu.Item>
            <Menu.Item key={"logout"} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
    </ConfigProvider>
  );
}
