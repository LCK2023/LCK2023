import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    // 임시 저장 (player detail test)
    isLogin: true,
    username: 'admin',
    token: '78ce7e4b05b63481b84e491d150a2fd9517f556e',
  },
  reducers: {

  }
})

export default loginSlice.reducer