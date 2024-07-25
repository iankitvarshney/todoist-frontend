import { useState } from "react";
import { Button, Modal } from "antd";

function CustomModal({ children, buttonTitle, modalTitle }: any) {
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
      <Button type="text" onClick={showModal}>
        {buttonTitle}
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
}

export default CustomModal;
