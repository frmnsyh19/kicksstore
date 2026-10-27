// store/shippingSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ShippingOption = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};

type ShippingState = { selected: ShippingOption | null };

const initialState: ShippingState = { selected: null };

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipping: (state, action: PayloadAction<ShippingOption>) => {
      state.selected = action.payload;
    },
    clearShipping: (state) => {
      state.selected = null;
    },
  },
});

export const { setShipping, clearShipping } = shippingSlice.actions;
export default shippingSlice.reducer;
