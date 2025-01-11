import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  qnaList: [], // QnA 게시글 목록
  loading: false, // 로딩 상태
  error: null, // 에러 상태
};

const qnaSlice = createSlice({
  name: 'qna',
  initialState,
  reducers: {
    setQnAList(state, action) {
      state.qnaList = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addQnA(state, action) {
      state.qnaList.push(action.payload);
    },
    updateQnA(state, action) {
      const updatedQnA = action.payload;
      const index = state.qnaList.findIndex((qna) => qna.qno === updatedQnA.qno);
      if (index !== -1) {
        state.qnaList[index] = updatedQnA;
      }
    },
    deleteQnA(state, action) {
      const qno = action.payload;
      state.qnaList = state.qnaList.filter((qna) => qna.qno !== qno);
    },
  },
});

export const {
  setQnAList,
  setLoading,
  setError,
  addQnA,
  updateQnA,
  deleteQnA,
} = qnaSlice.actions;

export default qnaSlice.reducer;
