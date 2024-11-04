import { Middleware, createSlice } from "@reduxjs/toolkit";

export const themeLocalStorageMiddleware: Middleware = (storeAPT) => (next) => (action) => {
  const result = next(action);
  const state = storeAPT.getState();
  localStorage.setItem("theme-customizer", state.theme.theme);
  return result;
};

const rehydrate = (key: string, defaultValue: string) => {
  const savedValue = localStorage.getItem(key);

  return savedValue || defaultValue;
};

export const themeSlice = createSlice({
  name: "menuSidebar",
  initialState: {
    theme: rehydrate("theme-customizer", "light-blue"),
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
