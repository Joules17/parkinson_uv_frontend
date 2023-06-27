
import { createSlice } from '@reduxjs/toolkit';

const initialState = {bool: false};

const endGame = createSlice({
  name: 'endGame',
  initialState,
  reducers: {
    setEndGame: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetEndGame() {
      return initialState;
    }
  },
});

export const { setEndGame, resetEndGame } = endGame.actions;

export default endGame.reducer;