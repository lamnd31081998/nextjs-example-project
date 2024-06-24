import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface NotificationStateInterface {
    type?: "error" | "success" | "none",
    title?: string,
    message?: string
}

const initialState: NotificationStateInterface = {
    type: "none"
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotificationState: (state, updateData: PayloadAction<NotificationStateInterface>) => {
            state.type = updateData.payload.type;
            state.title = updateData.payload.title;
            state.message = updateData.payload.message;
        },
        resetNotificationState: (state) => {
            state.type = "none";
            state.title = "";
            state.message = "";
        }
    }
})

export const { updateNotificationState, resetNotificationState } = notificationSlice.actions
export default notificationSlice.reducer