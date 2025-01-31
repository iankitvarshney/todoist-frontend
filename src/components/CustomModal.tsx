import { useState } from "react";
import { Modal } from "antd";

function CustomModal({
  children,
  buttonTitle,
  modalTitle,
  buttonStyles = {},
  modalStyles = {},
}: any) {
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
      <div style={buttonStyles} onClick={showModal}>
        {buttonTitle}
      </div>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={modalStyles}
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
      >
        {children}
      </Modal>
    </>
  );
}

export default CustomModal;
