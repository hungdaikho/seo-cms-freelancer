import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalType, EModalType } from '@/types/modal.type';

interface ModalState {
    modals: IModalType[];
}

const initialState: ModalState = {
    modals: []
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IModalType>) => {
            const existingModal = state.modals.find(modal => modal.key === action.payload.key);
            if (existingModal) {
                existingModal.open = true;
                existingModal.width = action.payload.width;
                existingModal.className = action.payload.className;
                existingModal.title = action.payload.title;
            } else {
                state.modals.push(action.payload);
            }
        },
        closeModal: (state, action: PayloadAction<EModalType>) => {
            const modal = state.modals.find(modal => modal.key === action.payload);
            if (modal) {
                modal.open = false;
            }
        },
        closeAllModals: (state) => {
            state.modals.forEach(modal => {
                modal.open = false;
            });
        }
    }
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
