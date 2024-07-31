import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { setProjectTasks, setSectionTasks } from "../redux/taskSlice";
import { MainTaskTree } from "./index";

function Tasks({ parent, parentId }: any) {
  const [loading, setLoading] = useState(true);

  let tasks: any = [];
  const dispatch = useDispatch();

  if (parent === "project") {
    const projectTasks: any = useSelector<any>(
      (store) => store.task.projectTasks
    );

    if (projectTasks.length !== 0) {
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
          dispatch(setProjectTasks(response.data.data));
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

  if (tasks.length === 0) {
    return <></>;
  }

  return (
    <div>
      <MainTaskTree tasks={tasks} parentId={null} />
    </div>
  );
}

export default Tasks;
