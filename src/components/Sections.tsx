import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { List, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { setSections } from "../redux/sectionSlice";

function Sections({ projectId }: any) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { Text } = Typography;
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
    <div>
      <p>Sections</p>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={sections}
        renderItem={(section: any) => (
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
                <Text>{section.name}</Text>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Sections;
