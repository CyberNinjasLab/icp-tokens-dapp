import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PriceState {
  price: number[][];
  status: string | null;
  error: string | null;
}

const symbol = "ETHUSDT";
const interval = "1d";

const now = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(now.getFullYear() - 1);
const startTime = oneYearAgo.getTime();
const endTime = now.getTime();

const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`;

export const fetchHistoryPrice = createAsyncThunk<number[][], void, { rejectValue: string }>(
  "price/fetchHistoryPrice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data: number[][] = await response.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PriceState = {
  price: [],
  status: null,
  error: null,
};

export const historyPriceSlice = createSlice({
  name: "historyPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistoryPrice.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchHistoryPrice.fulfilled, (state, action) => {
      state.status = "resolved";
      state.price = action.payload;
    });
    builder.addCase(fetchHistoryPrice.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export default historyPriceSlice.reducer;
