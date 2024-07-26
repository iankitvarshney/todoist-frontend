import { useState } from "react";
import { Button, Typography } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Comments, TaskTree } from "./index";

function TaskModal({ task, tasks }: any) {
  const [open, setOpen] = useState(false);

  const { Title } = Typography;

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
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
    </div>
  );
}

export default TaskModal;
