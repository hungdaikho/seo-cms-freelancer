import React from 'react'
import { Modal } from 'antd'
import { EModalType, IModalType } from '@/types/modal.type';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import DefaultModal from './default.modal';
export type ModalContent = {
    key: string | number;
    content: React.ReactNode;
};
const ModalComponent = () => {
    const modal: IModalType = useSelector((state: RootState) => state.modal)
    const renderContentModal = () => {
        switch (modal.key) {
            case EModalType.DEFAULT_MODAL:
                return <DefaultModal />
        }
    }
    return (
        <Modal open={modal.open} title={modal.title || ''} width={modal.width ?? 'auto'} className={modal.className ?? ''} >
            {renderContentModal()}
        </Modal>
    );
};

export default ModalComponent