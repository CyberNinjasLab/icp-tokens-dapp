import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceState {
  prices: any[];
  status: string | null;
  error: string | null;
}

export const url = (items: number) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=${items}&page=1&sparkline=false&price_change_percentage=24h`;

export const fetchTopPriceGecko = createAsyncThunk<
  any[],
  number | undefined,
  { rejectValue: string }
>("prices/fetchTopPriceGecko", async (items = 10, { rejectWithValue }) => {
  try {
    const response = await fetch(url(items));

    if (!response.ok) {
      throw new Error("Server Error!");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: PriceState = {
  prices: [],
  status: null,
  error: null,
};

export const topListPricesGecko = createSlice({
  name: "topPriceGecko",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopPriceGecko.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTopPriceGecko.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.status = "resolved";
      state.prices = action.payload;
    });
    builder.addCase(
      fetchTopPriceGecko.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";
        state.error = action.payload || null;
      }
    );
  },
});

export default topListPricesGecko.reducer;
