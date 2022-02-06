import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountrySlice {
  value: {
    countryId: number;
    cityName: string;
  };
}

const initialState: CountrySlice = {
  value: { countryId: 0, cityName: "" },
};

const countrySlice = createSlice({
  name: "countryId",
  initialState,
  reducers: {
    countryId(state, action: PayloadAction<number>) {
      state.value.countryId = action.payload;
    },
    cityName(state, action: PayloadAction<string>) {
      state.value.cityName = action.payload;
    },
  },
});

export const { countryId, cityName } = countrySlice.actions;
export default countrySlice.reducer;
