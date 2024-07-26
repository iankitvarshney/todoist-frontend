import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { Button, Layout, Menu, theme, Typography } from "antd";
import {
  EllipsisOutlined,
  InboxOutlined,
  MenuOutlined,
  NumberOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setProjects } from "../../redux/projectSlice";

const { Header, Sider, Content } = Layout;

const Homepage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Text } = Typography;

  const projects: any = useSelector<any>((store) => store.project.projects);

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/projects"
        );
        if (response.status !== 200) {
          throw new Error(response.data);
        }

        dispatch(setProjects(response.data.data));
      } catch (error: unknown) {
        const knownError = error as AxiosError;
        console.log(knownError.response?.statusText);
      }
    }

    getProjects();
  }, []);

  const projectsList = projects
    .filter((project: any) => project.isInboxProject === false)
    .map((project: any): any => {
      return {
        key: `project/${project.id}`,
        icon: <NumberOutlined />,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>{project.name}</Text>
            <Button
              size="small"
              className="project-item-button"
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <EllipsisOutlined
                className="project-item-button-icon"
                style={{ fontSize: "20px" }}
              />
              <Text
                className="project-item-button-text"
                style={{ paddingRight: "6px" }}
              >
                4
              </Text>
            </Button>
          </div>
        ),
      };
    });

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        theme="light"
        width={280}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => {
            navigate(`/app/${key}`);
          }}
          items={[
            {
              key: "user",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              type: "divider",
            },
            {
              key: "inbox",
              icon: <InboxOutlined />,
              label: "Inbox",
            },
            {
              key: "my-projects",
              icon: <ProjectOutlined />,
              label: "My Projects",
              children: projectsList,
              className: "my-projects-menu",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Homepage;
