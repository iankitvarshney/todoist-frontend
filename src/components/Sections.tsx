import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { List } from "antd";
import { setSections } from "../redux/sectionSlice";
import { Section } from "./index";

function Sections({ projectId }: any) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  let sections: any = [];

  const projectSections = useSelector<any>(
    (store) => store.section.sections[projectId]
  );

  if (projectSections !== undefined) {
    sections = projectSections;
  }

  useEffect(() => {
    async function getSections() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/sections?projectId=${projectId}`
        );
        if (response.status !== 200) {
          throw new Error(response.data);
        }

        dispatch(
          setSections({
            id: projectId,
            data: response.data.data,
          })
        );
      } catch (error: unknown) {
        const knownError = error as AxiosError;
        console.log(knownError.response?.statusText);
      } finally {
        setLoading(false);
      }
    }

    getSections();
  }, [projectId]);

  return (
    <div style={{ padding: "12px 0" }}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={sections}
        renderItem={(section: any) => <Section section={section} />}
      />
    </div>
  );
}

export default Sections;
