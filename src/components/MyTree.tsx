import { Tree, type TreeDataNode, type TreeProps } from "antd";
import Task from "./Task";

function MyTree({ tasks }: any) {
  const constructTree = (tasks: any, parentId: any) => {
    const filteredTasks = tasks.filter(
      (task: any) => task.parentId === parentId
    );

    return filteredTasks.map((task: any) => {
      return {
        // title: task.content,
        // title: (
        //   <div>
        //     <p>label</p>
        //     <button>click</button>
        //   </div>
        // ),
        title: <Task task={task} tasks={tasks} />,
        style: {
          // border: "1px solid red",
          padding: "0",
          margin: "0",
          // backgroundColor: "pink",
          display: "flex",
          justifyContent: "center",
        },
        className: "tree-task",
        key: task.id + "-" + task.content,
        // label: <p>label</p>,
        children: constructTree(tasks, task.id),
      };
    });
  };

  const treeData: TreeDataNode[] = constructTree(tasks, null);

  return (
    <div>
      <Tree
        // checkable
        blockNode={true}
        // defaultExpandedKeys={["0-0-0", "0-0-1"]}
        // defaultSelectedKeys={["0-0-0", "0-0-1"]}
        // defaultCheckedKeys={["0-0-0", "0-0-1"]}
        // onSelect={onSelect}
        // onCheck={onCheck}
        treeData={treeData}
        style={
          {
            // border: "1px solid red",
          }
        }
      />
    </div>
  );
}

export default MyTree;
