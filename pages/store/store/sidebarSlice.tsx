import { Middleware, createSlice } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware = (storeAPT) => (next) => (action) => {
  const result = next(action);
  const state = storeAPT.getState();
  localStorage.setItem("isSidebarShort", state.sidebar.isSidebarShort);
  localStorage.setItem("isSidebarOpen", state.sidebar.isSidebarShort);
  return result;
};

const rehydrate = (key: string) => {
  const storedValue = localStorage.getItem(key);

  if (storedValue !== null && storedValue !== undefined) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Failed to parse stored value for key: ${key}`, error);
      return false;
    }
  } else {
    return false;
  }
};

export const sidebarSlice = createSlice({
  name: "menuSidebar",
  initialState: {
    isSidebarShort: rehydrate("isSidebarShort"),
    isSidebarOpen: rehydrate("isSidebarOpen"),
  },
  reducers: {
    toggleSidebarShort: (state) => {
      state.isSidebarShort = !state.isSidebarShort;
    },
    toggleSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebarShort, toggleSidebarOpen, setSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
