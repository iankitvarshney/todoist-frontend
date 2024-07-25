import { List } from "antd";
import { Task } from "./index";

function TaskTree({ tasks, parentId, level = 0 }: any) {
  const filteredTasks = tasks.filter((task: any) => task.parentId === parentId);

  if (filteredTasks.length === 0) {
    return <></>;
  }

  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={filteredTasks}
      style={{
        paddingLeft: `${16 * level}px`,
      }}
      renderItem={(task: any) => (
        <>
          <Task task={task} />
          <TaskTree tasks={tasks} parentId={task.id} level={level + 1} />
        </>
      )}
    />
  );
}

export default TaskTree;
