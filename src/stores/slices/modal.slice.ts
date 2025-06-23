import { EModalType, IModalType } from "@/types/modal.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IModalType = {
    key: EModalType.DEFAULT_MODAL,
    open: false
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state: IModalType, action: PayloadAction<IModalType>) => {
            state = action.payload
            return state
        }
    }
})
export default modalSlice.reducer
export const { setModal } = modalSlice.actions