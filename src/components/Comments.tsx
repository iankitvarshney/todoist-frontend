import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { Button, List, Typography } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { setTaskComments } from "../redux/commentSlice";
import { Comment } from "./index";

function Comments({ parent, parentId }: any) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  let comments: any = [];
  const dispatch = useDispatch();
  const { Title } = Typography;

  if (parent === "task") {
    const taskComments = useSelector<any>(
      (store) => store.comment.taskComments[parentId]
    );

    if (taskComments !== undefined) {
      comments = taskComments;
    }
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments?${parent + "Id"}=${parentId}`
        );
        if (response.status !== 200) {
          throw new Error(response.data);
        }

        if (parent === "task") {
          dispatch(
            setTaskComments({
              id: parentId,
              data: response.data.data,
            })
          );
        }
      } catch (error: unknown) {
        const knownError = error as AxiosError;
        console.log(knownError.response?.statusText);
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, [parentId]);

  return (
    <div style={{ padding: "12px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
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
        <Title level={5}>Comments</Title>
      </div>
      {open && (
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={comments}
          renderItem={(comment: any) => <Comment comment={comment} />}
        />
      )}
    </div>
  );
}

export default Comments;
