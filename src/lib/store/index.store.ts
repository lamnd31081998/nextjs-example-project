import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from "./notification.store";
import userReducer from "./user.store";
import { useDispatch, useSelector, useStore } from 'react-redux';

export const makeStore = () => {
    return configureStore({
        reducer: {
            notification: notificationReducer,
            user: userReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()