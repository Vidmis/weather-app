import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountrySlice {
  value: number | undefined;
}

const initialState: CountrySlice = {
  value: undefined,
};

const countrySlice = createSlice({
  name: "countryId",
  initialState,
  reducers: {
    countryId(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { countryId } = countrySlice.actions;
export default countrySlice.reducer;
