// gameListReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {gamesList: {}};

const gamesListSlice = createSlice({
  name: 'gameList',
  initialState,
  reducers: {
    setGameList: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetGameList() {
      return initialState;
    }
  },
});

export const { setGameList, resetGameList } = gamesListSlice.actions;

export default gamesListSlice.reducer;