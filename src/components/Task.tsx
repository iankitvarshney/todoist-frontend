import { Button } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { CustomModal, TaskModal } from "./index";

function Task({ task, tasks }: any) {
  return (
    <div
      style={{
        borderBottom: "1px solid lightgray",
        display: "flex",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <div>
          <Button
            className="check-btn"
            type="text"
            style={{
              width: "24px",
              height: "28px",
            }}
          >
            <CheckCircleOutlined />
          </Button>
        </div>
        <CustomModal
          buttonTitle={
            <div
              style={{
                width: "100%",
              }}
            >
              <p>{task.content}</p>
            </div>
          }
          modalTitle={task.content}
        >
          <TaskModal task={task} tasks={tasks} />
        </CustomModal>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            style={{
              width: "24px",
              height: "28px",
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="text"
            style={{
              width: "24px",
              height: "28px",
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Task;
