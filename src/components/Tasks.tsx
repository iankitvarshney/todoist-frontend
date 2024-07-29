import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { setProjectTasks, setSectionTasks } from "../redux/taskSlice";
import { TaskTree } from "./index";

function Tasks({ parent, parentId }: any) {
  const [loading, setLoading] = useState(true);

  let tasks: any = [];
  const dispatch = useDispatch();

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

        if (parent === "project") {
          dispatch(
            setProjectTasks({
              id: parentId,
              data: response.data.data,
            })
          );
        } else if (parent === "section") {
          dispatch(
            setSectionTasks({
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
      <TaskTree tasks={tasks} />
    </div>
  );
}

export default Tasks;
