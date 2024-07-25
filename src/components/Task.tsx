import { useState } from "react";
import { Button, List, Modal, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Comments, TaskTree } from "./index";

function Task({ task, tasks }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { Text, Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">
          <EditOutlined />
        </a>,
        <a key="list-loadmore-more">
          <DeleteOutlined />
        </a>,
      ]}
    >
      <Skeleton title={false} active loading={false}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <a>
            <CheckCircleOutlined />
          </a>
          <Text onClick={showModal}>{task.content}</Text>
        </div>
        <Modal
          title={task.content}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          mask={false}
        >
          <div style={{ padding: "12px 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
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
              <Title level={5}>Sub-tasks</Title>
            </div>
            {open && <TaskTree tasks={tasks} parentId={task.id} />}
          </div>
          <Comments parent="task" parentId={task.id} />
        </Modal>
      </Skeleton>
    </List.Item>
  );
}

export default Task;
