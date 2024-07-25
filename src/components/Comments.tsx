import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { List } from "antd";
import { setTaskComments } from "../redux/commentSlice";
import { Comment } from "./index";

function Comments({ parent, parentId }: any) {
  const [loading, setLoading] = useState(true);

  let comments: any = [];
  const dispatch = useDispatch();

  if (parent === "task") {
    const taskComments = useSelector<any>(
      (store) => store.comment.taskComments[parentId]
    );

    if (taskComments !== undefined) {
      comments = taskComments;
    }
  }

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
    <div>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={comments}
        renderItem={(comment: any) => <Comment comment={comment} />}
      />
    </div>
  );
}

export default Comments;
