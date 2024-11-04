import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceState {
  prices: any[];
  status: string | null;
  error: string | null;
}

interface ApiResponse {
  status: object;
  data: any[];
}

const url = `https://backend-ex.onrender.com`;

export const fetchTopPrice = createAsyncThunk<any[], void, { rejectValue: string }>(
  "price/fetchTopPrice",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log(dispatch);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const responseData: ApiResponse = await response.json();

      return responseData.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PriceState = {
  prices: [],
  status: null,
  error: null,
};

export const topPriceSlice = createSlice({
  name: "topPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopPrice.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTopPrice.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.status = "resolved";
      state.prices = action.payload;
    });
    builder.addCase(fetchTopPrice.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";
      state.error = action.payload || null;
    });
  },
});

export default topPriceSlice.reducer;
