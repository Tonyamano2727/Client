import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,
    isLoading: false,
    isShowCart: false
  },
  reducers: {
    Showcart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false
    }

  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCategory.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getCategory.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.categories = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCategory.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
})
export const {Showcart } = appSlice.actions

export default appSlice.reducer