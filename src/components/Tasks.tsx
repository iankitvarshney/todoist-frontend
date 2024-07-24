import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { List, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { setProjectTasks } from "../redux/taskSlice";

function Tasks({ parent, parentId }: any) {
  const [loading, setLoading] = useState(true);
  let tasks: any = [];
  const dispatch = useDispatch();
  const { Text } = Typography;

  if (parent === "project") {
    const projectTasks = useSelector<any>(
      (store) => store.task.projectTasks[parentId]
    );

    if (projectTasks !== undefined) {
      tasks = projectTasks;
    }
  } else if (parent === "section") {
    const sectionTasks = useSelector<any>(
      (store) => store.task.sectionTasks[parentId]
    );

    if (sectionTasks !== undefined) {
      tasks = sectionTasks;
    }
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks?${parent + "Id"}=${parentId}`
        );
        if (response.status !== 200) {
          throw new Error(response.data);
        }

        dispatch(
          setProjectTasks({
            id: parentId,
            data: response.data.data,
          })
        );
        setLoading(false);
      } catch (error: unknown) {
        const knownError = error as AxiosError;
        console.log(knownError.response?.statusText);
      }
    }

    getTasks();
  }, [parentId]);

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={tasks}
        renderItem={(task: any) => (
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
            <Skeleton title={false} loading={loading} active>
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
        )}
      />
    </div>
  );
}

export default Tasks;
