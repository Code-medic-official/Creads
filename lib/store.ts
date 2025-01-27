import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./features/commentSlice";

export const makeStore = () =>
	configureStore({
		reducer: {
			comment: commentReducer,
		},
	});

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
