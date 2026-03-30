import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import splitReducer from "./splitSlice"

export const store = configureStore({
  reducer: {
    split: splitReducer,
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// ─── Typed hooks ─────────────────────────────────────────────────────────────

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector)
