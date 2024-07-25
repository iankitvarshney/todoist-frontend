import { useState } from "react";
import { List, Modal, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function Task({ task }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Text } = Typography;

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
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Skeleton>
    </List.Item>
  );
}

export default Task;
