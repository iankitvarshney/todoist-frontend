import { List, Skeleton } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { CustomModal, TaskModal } from "./index";

function Task({ task, tasks }: any) {
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
          <CustomModal buttonTitle={task.content} modalTitle={task.content}>
            <TaskModal task={task} tasks={tasks} />
          </CustomModal>
        </div>
      </Skeleton>
    </List.Item>
  );
}

export default Task;
