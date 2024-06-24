import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserStateInterface {
    id: string,
    username: string,
    name: string,
    avatar_url?: string
}

const initialState: UserStateInterface = {
    id: "",
    username: "",
    name: "",
    avatar_url: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserState: (state, updateData: PayloadAction<UserStateInterface>) => {
            state.id = updateData.payload.id;
            state.username = updateData.payload.username;
            state.name = updateData.payload.name;
            if (updateData?.payload?.avatar_url) state.avatar_url = updateData.payload.avatar_url;
        },
        resetUserState: (state) => {
            state.id = "";
            state.username = "";
            state.name = "";
            state.avatar_url = "";
        }
    }
})

export const { updateUserState, resetUserState } = userSlice.actions
export default userSlice.reducer