import { List, Skeleton, Typography } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function Comment({ comment }: any) {
  const { Text } = Typography;

  return (
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
          <Text>{comment.content}</Text>
        </div>
      </Skeleton>
    </List.Item>
  );
}

export default Comment;
