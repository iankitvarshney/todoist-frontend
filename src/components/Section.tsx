import { useState } from "react";
import { Button, List, Skeleton, Typography } from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Tasks } from "./index";

function Section({ section }: any) {
  const [open, setOpen] = useState(false);

  const { Text } = Typography;

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <List.Item
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton title={false} loading={false} active>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
            }}
          >
            <Button
              onClick={handleOpen}
              style={{
                height: "28px",
                width: "20px",
              }}
            >
              {open ? <DownOutlined /> : <RightOutlined />}
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Text>{section.name}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <a key="list-loadmore-edit">
                  <EditOutlined />
                </a>
                <a key="list-loadmore-more">
                  <DeleteOutlined />
                </a>
              </div>
            </div>
          </div>
          {open && (
            <div
              style={{
                width: "98%",
                margin: "auto",
                padding: "8px 20px",
              }}
            >
              <Tasks parent="section" parentId={section.id} />
            </div>
          )}
        </div>
      </Skeleton>
    </List.Item>
  );
}

export default Section;
