import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { Modal } from "antd";
import { EModalType, IModalType } from "@/types/modal.type";
import { closeModal } from "@/stores/slices/modal.slice";

const ModalComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: RootState) => state.modal);

  const renderModalContent = (modalType: EModalType) => {
    switch (modalType) {
      case EModalType.DEFAULT_MODAL:
        return <div>Default Modal Content</div>;
      default:
        return null;
    }
  };

  const handleModalClose = (modalKey: EModalType) => {
    dispatch(closeModal(modalKey));
  };

  return (
    <>
      {modals.map((modal: IModalType) => (
        <Modal
          key={modal.key}
          open={modal.open}
          width={modal.width}
          className={modal.className}
          title={modal.title}
          footer={null}
          onCancel={() => handleModalClose(modal.key)}
        >
          {renderModalContent(modal.key)}
        </Modal>
      ))}
    </>
  );
};

export default ModalComponent;
