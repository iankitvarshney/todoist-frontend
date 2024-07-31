import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import { ModalTaskTree } from "./index";

function TaskModal({ task, handleCancel }: any) {
  const tasks = useSelector(
    (store: any) => store.task.projectTasks[task.projectId]
  );

  const project = useSelector((store: any) => store.project.projects[0]);

  const [currentTask, setCurrentTask] = useState(task);
  const [parentTask, setParentTask] = useState<any>(
    tasks.find((currentTask: any) => currentTask.id === task.parentId)
  );

  const { Title } = Typography;

  return (
    <div
      style={{
        margin: "0",
        padding: "0",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #eee",
          padding: "10px 12px",
        }}
      >
        <Button type="text" icon={<NumberOutlined />} onClick={handleCancel}>
          {project.name}
        </Button>
      </div>
      <div style={{ padding: "14px" }}>
        {parentTask && (
          <Button
            onClick={() => {
              let mainTask = tasks.find(
                (task: any) => task.id === parentTask.parentId
              );
              setParentTask(mainTask);
              setCurrentTask(parentTask);
            }}
            style={{
              marginBottom: "12px",
            }}
          >
            {parentTask?.content}
          </Button>
        )}
        <div>
          <Title level={4}>{currentTask.content}</Title>
        </div>
        <ModalTaskTree
          tasks={tasks}
          parentId={currentTask.id}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setParentTask={setParentTask}
        />
      </div>
    </div>
  );
}

export default TaskModal;
