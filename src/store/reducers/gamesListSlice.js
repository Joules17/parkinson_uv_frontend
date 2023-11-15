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
    },

    markGameAsPlayed: (state, action) => {
      const { gameName } = action.payload;
      const { games } = state.gamesList;
      
      // Encuentra el juego por nombre
      const gameToMarkAsPlayed = games.find((game) => game.name === gameName);
      console.log(gameName)
      if (gameToMarkAsPlayed) {
        gameToMarkAsPlayed.is_played = true;
      }
    },
  },
});

export const { setGameList, resetGameList, markGameAsPlayed } = gamesListSlice.actions;

export default gamesListSlice.reducer;