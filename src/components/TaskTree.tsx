import { Tree, type TreeDataNode, type TreeProps } from "antd";
import Task from "./Task";

function TaskTree({ tasks }: any) {
  const constructTree = (tasks: any, parentId: any) => {
    const filteredTasks = tasks.filter(
      (task: any) => task.parentId === parentId
    );

    return filteredTasks.map((task: any) => {
      return {
        title: <Task task={task} tasks={tasks} />,
        className: "tree-task",
        key: task.id + "-" + task.content,
        children: constructTree(tasks, task.id),
        style: {
          display: "flex",
          justifyContent: "center",
          padding: "0",
          margin: "0",
        },
      };
    });
  };

  const treeData: TreeDataNode[] = constructTree(tasks, null);

  return (
    <div>
      <Tree blockNode={true} treeData={treeData} />
    </div>
  );
}

export default TaskTree;
