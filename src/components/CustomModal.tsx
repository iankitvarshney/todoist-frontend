import { useState } from "react";
import { Button, Modal } from "antd";

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
      <Button type="text" onClick={showModal} style={buttonStyles}>
        {buttonTitle}
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={modalStyles}
      >
        {children}
      </Modal>
    </>
  );
}

export default CustomModal;
