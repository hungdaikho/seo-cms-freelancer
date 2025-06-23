import { createSlice } from "@reduxjs/toolkit"

const initialState: boolean = false 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{}
})
export default authSlice.reducer