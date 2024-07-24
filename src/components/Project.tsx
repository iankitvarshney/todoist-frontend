import { Typography } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tasks } from "./index";

function Project() {
  const { projectId } = useParams();
  const projects: any = useSelector<any>((store) => store.project.projects);

  const project = projects.find((project: any) => {
    if (projectId === undefined) {
      return project.isInboxProject === true;
    } else {
      return project.id + "" === projectId;
    }
  });

  const { Title } = Typography;

  if (projects.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {projectId === undefined ? (
        <Title level={3}>Inbox</Title>
      ) : (
        <Title level={3}>{project.name}</Title>
      )}
      <Tasks parent="project" parentId={project.id} />
    </div>
  );
}

export default Project;
