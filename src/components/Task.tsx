import { useState } from "react";
import { List, Modal, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Comments, TaskTree } from "./index";

function Task({ task, tasks }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Title level={5}>Sub-tasks</Title>
            <TaskTree tasks={tasks} parentId={task.id} />
          </div>
          <Comments parent="task" parentId={task.id} />
        </Modal>
      </Skeleton>
    </List.Item>
  );
}

export default Task;
