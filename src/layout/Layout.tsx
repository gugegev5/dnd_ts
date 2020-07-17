import React from "react";

import { Layout, Menu } from "antd";
import { CameraTwoTone } from "@ant-design/icons";

import LeftAttr from "../layout/LeftAttr";
import RightDisplay from "../layout/RightDisplay";

const { Content, Sider } = Layout;

export default function PageLayout() {
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<CameraTwoTone />}>
            Background
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content
          style={{ padding: "24px 16px", height: "100vh", display: "flex" }}
        >
          <LeftAttr />
          <RightDisplay />
        </Content>
      </Layout>
    </Layout>
  );
}
