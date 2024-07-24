import { List, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function TaskTree({ tasks, parentId, level = 0 }: any) {
  const filteredTasks = tasks.filter((task: any) => task.parentId === parentId);

  const { Text } = Typography;

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
                <Text>{task.content}</Text>
              </div>
            </Skeleton>
          </List.Item>
          <TaskTree tasks={tasks} parentId={task.id} level={level + 1} />
        </>
      )}
    />
  );
}

export default TaskTree;
