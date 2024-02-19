import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalOpen = payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
