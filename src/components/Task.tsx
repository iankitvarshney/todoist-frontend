import { useState } from "react";
import { Modal } from "antd";
import { TaskModal } from "./index";

function Task({ task, taskTreeParentId, subTasks }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>
        <p>{task.content}</p>
        {subTasks.length > 0 && (
          <div
            style={{
              color: "rgb(128, 128, 128)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-label="1/3 sub-tasks"
            >
              <path
                fill="rgb(128, 128, 128)"
                d="M4.5 2A2.5 2.5 0 0 1 5 6.95V8.5a2.5 2.5 0 0 0 2.336 2.495L7.5 11h1.55a2.5 2.5 0 1 1 0 1H7.5a3.5 3.5 0 0 1-3.495-3.308L4 8.5V6.95A2.5 2.5 0 0 1 4.5 2zm7 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-7-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
              ></path>
            </svg>
            <p>{subTasks.length}</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen && taskTreeParentId === null}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          style={{ padding: 0 }}
        >
          <TaskModal task={task} handleCancel={handleCancel} />
        </Modal>
      )}
    </>
  );
}

export default Task;
