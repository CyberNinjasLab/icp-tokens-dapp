import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import historyPriceSlice from "./historyPriceSlice";
import themeSlice, { themeLocalStorageMiddleware } from "./themeSlice";
import sidebarSlice, { localStorageMiddleware } from "./sidebarSlice";
import topListPrices from "./topListPrices";
import topListPricesGecko from "./topListPricesGecko";

const store = configureStore({
  reducer: {
    historyPriceSlice,
    topListPrices,
    topListPricesGecko,
    sidebar: sidebarSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themeLocalStorageMiddleware, localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
