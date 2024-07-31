import { Tree, type TreeDataNode, type TreeProps } from "antd";
import { Task } from "./index";

function MainTaskTree({ tasks, parentId }: any) {
  const constructTree = (tasks: any, treeParentId: any) => {
    const filteredTasks = tasks.filter(
      (task: any) => task.parentId === treeParentId
    );

    return filteredTasks.map((task: any) => {
      let currentSubTasks = tasks.filter(
        (currentTask: any) => currentTask.parentId === task.id
      );

      return {
        title: (
          <Task
            task={task}
            taskTreeParentId={parentId}
            subTasks={currentSubTasks}
          />
        ),
        key: task.id + "-" + task.content,
        children: constructTree(tasks, task.id),
      };
    });
  };

  const treeData: TreeDataNode[] = constructTree(tasks, parentId);

  return (
    <div className="task-tree">
      <Tree blockNode={true} treeData={treeData} defaultExpandAll={true} />
    </div>
  );
}

export default MainTaskTree;
